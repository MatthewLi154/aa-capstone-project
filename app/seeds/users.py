from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        firstName="Demo",
        lastName='Lize',
        profileImg='https://i.pinimg.com/236x/96/07/7b/96077bab1f3fd73bf3f27c2b65150210.jpg',
        about='My name is Demo, and I love to explore nature. Check out my boards!',
        website='http://google.com',
        pronouns='he/she')
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        firstName="Marnie",
        lastName='McDonald',
        profileImg='https://i.pinimg.com/236x/77/a8/6b/77a86bab23d21b3c657c754a0db6f30c.jpg',
        about="Marnie's description",
        website='http://google.com',
        pronouns='They/Them'
        )
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        firstName="Bobbie",
        lastName='Ross',
        profileImg='https://i.pinimg.com/736x/e0/fa/d5/e0fad54eca20bc0c9a5d5b2dd1f9f6df.jpg',
        about="Bobbie's description",
        website='http://google.com',
        pronouns='he/she'
        )
    william = User(
        username='william',
        email='william@aa.io',
        password='password',
        firstName="William",
        lastName='Ngo',
        profileImg='https://i.pinimg.com/236x/26/c7/35/26c7355fe46f62d84579857c6f8c4ea5.jpg',
        about="My name is William! I love dogs.",
        website='http://google.com',
        pronouns='he/she'
        )
    mary = User(
        username='Mary',
        email='mary@aa.io',
        password='password',
        firstName="Mary",
        lastName='Had a little lamb',
        profileImg='https://i.pinimg.com/236x/ec/eb/0e/eceb0e31ed7d1edae9cd84bd5f90c96d.jpg',
        about="My name is Mary! I am a cat.",
        website='http://google.com',
        pronouns='he/she'
        )
    smooch = User(
        username='smooch',
        email='smooch@aa.io',
        password='password',
        firstName="Smooch",
        lastName='Nipit',
        profileImg='https://i.imgur.com/SSfxhcW.png',
        about="My name is Smooch. Cat nip it.",
        website='http://google.com',
        pronouns='he/she'
        )
    angeli = User(
        username='angeli',
        email='angeli@aa.io',
        password='password',
        firstName="Angeli",
        lastName='Xu',
        profileImg='https://i.pinimg.com/564x/47/7e/87/477e87087806990b4a785264d9b3e8be.jpg',
        about="My name is Angeli, and I am addicted to Lost Ark",
        website='http://google.com',
        pronouns='he/she'
        )


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(william)
    db.session.add(mary)
    db.session.add(smooch)
    db.session.add(angeli)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
