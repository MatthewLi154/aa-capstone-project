from app.models import db, environment, SCHEMA
from app.models.pin import Pin

# Adds seeds for Pins
def seed_pins():
    pin_1 = Pin(profileId=1,
                destinationLink="http://google.com",
                title="Foggy Forest",
                about="In the midst of this forest, there is a tale...",
                altText="I took this shot on a drone!",
                note="I made this story up",
                image="https://i.pinimg.com/564x/9c/ee/1b/9cee1b89de0c8ad2921e2a9d09596313.jpg")

    pin_2 = Pin(profileId=3,
                destinationLink="http://pinterest.com",
                title="There it is lurking...",
                about="A great shot of some trees",
                altText="The trees are so green",
                note="Please don't come back here",
                image="https://i.pinimg.com/750x/2f/a0/21/2fa021ced012366daa4610f04deb25f2.jpg")

    pin_3 = Pin(profileId=3,
                destinationLink="http://google.com",
                title="Hilly Forest",
                about="I'm not sure why there's a lot of fog",
                altText="Trees are great",
                note="Also don't come back here",
                image="https://i.pinimg.com/564x/09/ff/4a/09ff4ad1a1d81d873a936f91c5ec87af.jpg")
    pin_4 = Pin(profileId=1,
                destinationLink="http://twitter.com",
                title="Country Side Flower Field",
                about="This field is near my house!",
                altText="Pink flowers and barn style fence",
                note="There's also a moon in the back",
                image="https://i.pinimg.com/564x/b8/10/14/b81014eed7c8867c4036f808997f4b5a.jpg")
    pin_5 = Pin(profileId=1,
                destinationLink="http://google.com",
                title="Night lights on the beach",
                about="This picture looks staged, but it's just nature at its finest!",
                altText="The lights are from the moon",
                note="Not a soul in sight",
                image="https://i.pinimg.com/564x/9f/96/0a/9f960acde5c3874c5dc5e4d34b64338e.jpg")
    pin_6 = Pin(profileId=2,
                destinationLink="http://github.com",
                title="Hole in the rock formation",
                about="I found a spot that no one knows about",
                altText="It's my secret only",
                note="I'm sure ton of tourists actually come here",
                image="https://i.pinimg.com/236x/dc/a2/93/dca293d2a28a3efdefa486095ecfcff1.jpg")
    pin_7 = Pin(profileId=2,
                destinationLink="http://google.com",
                title="Gorgeous fall tree",
                about="The way this tree bends has me feeling something",
                altText="Fall colors are in season",
                note="There are green trees in the back",
                image="https://i.pinimg.com/564x/81/4c/3c/814c3c9935392959e99de748224de0ec.jpg")
    pin_8 = Pin(profileId=1,
                destinationLink="http://google.com",
                title="Tall Snowy Mountain",
                about="Sitting by the river, I can enjoy the majestic view",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/236x/81/73/34/8173343c961e5bf4fd03dbee999eb666.jpg")
    pin_9 = Pin(profileId=2,
                destinationLink="http://google.com",
                title="Found a deer",
                about="Nature is the best",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/236x/6e/4a/bc/6e4abc3d3300c2d71f074241835126e9.jpg")
    pin_10 = Pin(profileId=1,
                destinationLink="http://google.com",
                title="Fox enjoying the wind",
                about="This fox is my spirit animal",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/564x/31/2e/8e/312e8ea95be092c5dc01d2e98998e8fd.jpg")
    pin_11 = Pin(profileId=3,
                destinationLink="http://google.com",
                title="A road surrounded by tall trees",
                about="It's nice",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/564x/e9/cd/d2/e9cdd2c7f0d1e1ffca9a132d04fad143.jpg")
    pin_12 = Pin(profileId=7,
                destinationLink="http://google.com",
                title="Swamp but very luminous",
                about="It's nice",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/236x/d6/44/37/d64437a9b922899c800afa5c0cb5b83d.jpg")
    pin_13 = Pin(profileId=4,
                destinationLink="http://google.com",
                title="Close up shot of the field",
                about="It's nice",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/236x/10/cd/14/10cd14b8dd2d1377604c84cae7624b90.jpg")
    pin_14 = Pin(profileId=4,
                destinationLink="http://google.com",
                title="Rakotzbrucke, Germany",
                about="It's nice",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/564x/62/0c/1e/620c1e2891329a70201da1dbd82b5255.jpg")
    pin_15 = Pin(profileId=4,
                destinationLink="http://google.com",
                title="Sunset pond",
                about="It's nice",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/564x/96/07/5c/96075c5903445d36fe243b95e3e883ed.jpg")
    pin_16 = Pin(profileId=5,
                destinationLink="http://google.com",
                title="Jackrabbit enjoying the flowers",
                about="It's nice",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/236x/1d/a8/0c/1da80c80bfb1eb73a799635490006778.jpg")
    pin_17 = Pin(profileId=5,
                destinationLink="http://google.com",
                title="The Bird",
                about="It's nice",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/236x/9c/42/56/9c42563cd4d86a1aa0600b41070a51cd.jpg")
    pin_18 = Pin(profileId=5,
                destinationLink="http://google.com",
                title="Lake side view",
                about="It's nice",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/236x/a9/97/fb/a997fbb1b27e225c39768ad21c2960aa.jpg")
    pin_19 = Pin(profileId=6,
                destinationLink="http://google.com",
                title="Forest Walk",
                about="It's nice",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/564x/60/88/fb/6088fbd28ecba39842080f866e0203a8.jpg")
    pin_20 = Pin(profileId=6,
                destinationLink="http://google.com",
                title="Dolomites",
                about="It's nice",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/564x/64/fa/4e/64fa4ee756478e2f0da7f59e9885931f.jpg")
    pin_21 = Pin(profileId=6,
                destinationLink="http://google.com",
                title="Au vert",
                about="It's nice",
                altText="Come back here",
                note="Went on Thursday",
                image="https://i.pinimg.com/564x/46/ee/33/46ee3324e0e5aa5b5e853310b251185c.jpg")


    db.session.add(pin_4)
    db.session.add(pin_14)
    db.session.add(pin_15)
    db.session.add(pin_5)
    db.session.add(pin_7)
    db.session.add(pin_8)
    db.session.add(pin_1)
    db.session.add(pin_9)
    db.session.add(pin_10)
    db.session.add(pin_11)
    db.session.add(pin_12)
    db.session.add(pin_13)
    db.session.add(pin_3)
    db.session.add(pin_16)
    db.session.add(pin_17)
    db.session.add(pin_2)
    db.session.add(pin_18)
    db.session.add(pin_19)
    db.session.add(pin_6)
    db.session.add(pin_20)
    db.session.add(pin_21)
    db.session.commit()


def undo_pins():
    if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pins")

    db.session.commit()
