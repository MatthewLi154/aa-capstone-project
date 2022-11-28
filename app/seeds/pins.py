from app.models import db, environment, SCHEMA
from app.models.pin import Pin

# Adds seeds for Pins
def seed_pins():
    pin_1 = Pin(profileId=1,
                destinationLink="google.com",
                title="My First Pin",
                about="This is my first pin!",
                altText="My first alt text",
                note="My first Note",
                image="https://i.pinimg.com/564x/9c/ee/1b/9cee1b89de0c8ad2921e2a9d09596313.jpg")

    pin_2 = Pin(profileId=1,
                destinationLink="pinterest.com",
                title="My Second Pin",
                about="This is my second pin!",
                altText="My second alt text",
                note="My second Note",
                image="https://i.pinimg.com/750x/2f/a0/21/2fa021ced012366daa4610f04deb25f2.jpg")

    pin_3 = Pin(profileId=1,
                destinationLink="google.com",
                title="My Third Pin",
                about="This is my third pin!",
                altText="My third alt text",
                note="My Third Note",
                image="https://i.pinimg.com/564x/09/ff/4a/09ff4ad1a1d81d873a936f91c5ec87af.jpg")
    pin_4 = Pin(profileId=2,
                destinationLink="google.com",
                title="My Fourth Pin",
                about="This is my Fourt pin!",
                altText="My Fourth alt text",
                note="My Fourth Note",
                image="https://i.pinimg.com/564x/0c/a9/9d/0ca99d1a3541ba042c8273e2ffc67688.jpg")
    pin_5 = Pin(profileId=2,
                destinationLink="google.com",
                title="My Fifth Pin",
                about="This is my Fifth pin!",
                altText="My Fifth alt text",
                note="My Fifth Note",
                image="https://i.pinimg.com/564x/43/76/bf/4376bf276ba3da740926745c485f6643.jpg")
    pin_6 = Pin(profileId=3,
                destinationLink="google.com",
                title="My Sixth Pin",
                about="This is my sixth pin!",
                altText="My sixth alt text",
                note="My Sixth Note",
                image="https://i.pinimg.com/564x/49/f4/0d/49f40d48ee9372e7e6ebcd312b2ce6c5.jpg")
    pin_7 = Pin(profileId=3,
                destinationLink="google.com",
                title="My Seventh Pin",
                about="This is my Seventh pin!",
                altText="My seventh alt text",
                note="My seventh Note",
                image="https://i.pinimg.com/736x/7f/a0/2c/7fa02c94e61d79356a3ef0a00bdd2c28.jpg")
    pin_8 = Pin(profileId=3,
                destinationLink="google.com",
                title="My Eighth Pin",
                about="This is my Eigth pin!",
                altText="My Eigth alt text",
                note="My Eigth Note",
                image="https://i.pinimg.com/736x/6b/4b/b6/6b4bb6973cd83f6d9be9bdd432f41c73.jpg")

    db.session.add(pin_1)
    db.session.add(pin_2)
    db.session.add(pin_3)
    db.session.add(pin_4)
    db.session.add(pin_5)
    db.session.add(pin_6)
    db.session.add(pin_7)
    db.session.add(pin_8)
    db.session.commit()


def undo_pins():
    if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pins")

    db.session.commit()
