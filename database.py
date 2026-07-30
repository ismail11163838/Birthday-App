import sqlite3

DB = "birthday.db"

def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute("""
    CREATE TABLE IF NOT EXISTS birthdays(
        id TEXT PRIMARY KEY,
    	slug TEXT,
    	name TEXT,
    	wish TEXT,
    	code TEXT,
    	photo TEXT,
    	music TEXT,
    	background TEXT,
    	unlock_date TEXT,
    	unlock_time TEXT
    )
    """)
    conn.execute("""
    CREATE TABLE IF NOT EXISTS admin(
    	username TEXT PRIMARY KEY,
    	password TEXT
)
""")

    cur = conn.execute("SELECT COUNT(*) FROM admin")

    if cur.fetchone()[0] == 0:
        conn.execute(
            "INSERT INTO admin(username,password) VALUES(?,?)",
            ("admin","1433")
    )
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database Created Successfully")
