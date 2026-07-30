import json
import sqlite3

with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

conn = sqlite3.connect("birthday.db")
cur = conn.cursor()

for b in data["birthdays"]:
    cur.execute("""
    INSERT INTO birthdays(
        id, slug, name, wish, code,
        photo, music, background,
        unlock_date, unlock_time
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        b.get("id"),
        b.get("slug", ""),
        b.get("name", ""),
        b.get("wish", ""),
        b.get("code", ""),
        b.get("photo", ""),
        b.get("music", ""),
        b.get("background", ""),
        b.get("unlock_date", ""),
        b.get("unlock_time", "")
    ))

conn.commit()
conn.close()

print("✅ All birthdays imported successfully!")
