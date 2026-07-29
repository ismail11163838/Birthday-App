from flask import Flask, render_template, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from datetime import datetime
import json
import os
import uuid
import random
import string

app = Flask(__name__)
app.secret_key = "birthday_secret_2026"

DATA_FILE = "data.json"


def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def get_birthdays():
    data = load_data()
    return data["birthdays"]


def get_admin():
    data = load_data()
    return data["admin"]


@app.route("/")
def home():

    if not session.get("visitor"):
        return redirect("/login")

    birthdays = get_birthdays()

    if len(birthdays) == 0:
        return "No Birthday Found"

    return render_template(
        "index.html",
        data=birthdays[0]
    )

@app.route("/birthday/<slug>")
def birthday_page(slug):

    data = load_data()

    for b in data["birthdays"]:
        if b.get("slug") == slug:
            return render_template(
                "index.html",
                data=b
            )

    return "Birthday Not Found"

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        code = request.form.get("code")

        birthdays = get_birthdays()

        for b in birthdays:
            if b["code"] == code:
                session["visitor"] = True
                session["birthday_id"] = b["id"]
                return redirect("/birthday")

        return "Wrong Code ❌"

    return render_template("login.html")

@app.route("/birthday")
def birthday():

    if not session.get("visitor"):
        return redirect("/login")

    birthday_id = session.get("birthday_id")

    birthdays = get_birthdays()

    for b in birthdays:

        if b["id"] == birthday_id:

            if b.get("unlock_date") and b.get("unlock_time"):

                unlock = datetime.strptime(
                    b["unlock_date"] + " " + b["unlock_time"],
                    "%Y-%m-%d %H:%M"
                )

                if datetime.now() < unlock:

                    return render_template(
                        "countdown.html",
                        unlock_date=b["unlock_date"],
                        unlock_time=b["unlock_time"],
                        name=b["name"]
                    )

            return render_template("index.html", data=b)

    return "Birthday Not Found"

@app.route("/admin", methods=["GET", "POST"])
def admin():

    if request.method == "POST":

        username = request.form.get("username")
        password = request.form.get("password")

        admin = get_admin()

        if username == admin["username"] and password == admin["password"]:
            session["admin"] = True
            return redirect("/dashboard")

        return "Wrong Username or Password"

    return render_template("admin.html")


@app.route("/dashboard")
def dashboard():

    if not session.get("admin"):
        return redirect("/admin")

    birthdays = get_birthdays()

    return render_template(
        "dashboard.html",
        birthdays=birthdays
    )


@app.route("/logout")
def logout():

    session.clear()

    return redirect("/")

def generate_slug(length=8):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

@app.route("/create", methods=["POST"])
def create():

    if not session.get("admin"):
        return redirect("/admin")

    data = load_data()

    photo_name = ""
    music_name = ""
    background_name = ""

    photo = request.files.get("photo")
    if photo and photo.filename:
        photo_name = secure_filename(photo.filename)
        photo.save(os.path.join("static/uploads/photos", photo_name))

    music = request.files.get("music")
    if music and music.filename:
        music_name = secure_filename(music.filename)
        music.save(os.path.join("static/uploads/music", music_name))

    background = request.files.get("background")

    if background and background.filename:
        background_name = secure_filename(background.filename)
        background.save(
            os.path.join("static/uploads/backgrounds", background_name)
    )

    new_birthday = {
        "id": str(uuid.uuid4()),
        "slug": generate_slug(),
        "name": request.form.get("name"),
        "wish": request.form.get("wish"),
        "code": request.form.get("code"),
        "photo": photo_name,
        "music": music_name,
        "background": background_name,
        "unlock_date": request.form.get("unlock_date"),
	"unlock_time": request.form.get("unlock_time"),
    }

    data["birthdays"].append(new_birthday)

    save_data(data)

    return redirect("/dashboard")

@app.route("/edit/<birthday_id>", methods=["GET", "POST"])
def edit(birthday_id):

    if not session.get("admin"):
        return redirect("/admin")

    data = load_data()

    birthday = None

    for b in data["birthdays"]:
        if b["id"] == birthday_id:
            birthday = b
            break

    if birthday is None:
        return "Birthday Not Found"

    if request.method == "POST":

        birthday["name"] = request.form.get("name")
        birthday["wish"] = request.form.get("wish")
        birthday["code"] = request.form.get("code")

        save_data(data)

        return redirect("/dashboard")

    return render_template(
        "edit.html",
        birthday=birthday
    )
@app.route("/delete/<birthday_id>")
def delete(birthday_id):

    if not session.get("admin"):
        return redirect("/admin")

    data = load_data()

    data["birthdays"] = [
        b for b in data["birthdays"]
        if b["id"] != birthday_id
    ]

    save_data(data)

    return redirect("/dashboard")


@app.route("/change-admin-password", methods=["POST"])
def change_admin_password():

    if not session.get("admin"):
        return redirect("/admin")

    data = load_data()

    data["admin"]["password"] = request.form.get("password")

    save_data(data)

    return redirect("/dashboard")


if __name__ == "__main__":
    app.run(debug=True)
