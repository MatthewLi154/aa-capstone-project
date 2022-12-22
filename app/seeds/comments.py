from app.models import db, environment, SCHEMA
from app.models.comment import Comment
from datetime import datetime

# Add seeds for comments
def seed_comments():
    comment_1 = Comment(profileId=7,
                        pinId=1,
                        body="What a nice view",
                        createdAt=datetime.now())
    comment_2 = Comment(profileId=2,
                        pinId=1,
                        body="The moon is beautiful here",
                        createdAt=datetime.now())
    comment_3 = Comment(profileId=3,
                        pinId=1,
                        body="So peaceful",
                        createdAt=datetime.now())
    comment_4 = Comment(profileId=4,
                        pinId=2,
                        body="Amazing place!",
                        createdAt=datetime.now())
    comment_5 = Comment(profileId=5,
                        pinId=2,
                        body="I'd love to visit",
                        createdAt=datetime.now())
    comment_6 = Comment(profileId=6,
                        pinId=2,
                        body="Where is this?",
                        createdAt=datetime.now())

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.commit()

def undo_comments():
    if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
