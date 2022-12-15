from app.models import db, environment, SCHEMA
from app.models.comment import Comment
from datetime import datetime

# Add seeds for comments
def seed_comments():
    comment_1 = Comment(profileId=1,
                        pinId=1,
                        body="This is my first comment!",
                        createdAt=datetime.now())
    comment_2 = Comment(profileId=2,
                        pinId=1,
                        body="This is my second comment!",
                        createdAt=datetime.now())
    comment_3 = Comment(profileId=3,
                        pinId=1,
                        body="This is my third comment!",
                        createdAt=datetime.now())

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.commit()

def undo_comments():
    if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
