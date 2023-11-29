from mongoengine import (
    BooleanField,
    DateTimeField,
    Document,
    EmbeddedDocument,
    EmbeddedDocumentField,
    IntField,
    ListField,
    StringField,
)


class History(EmbeddedDocument):
    start_time = DateTimeField(required=True)
    end_time = DateTimeField()
    car_id = StringField(required=True)


class ParkingSpace(Document):
    space_id = StringField(required=True, unique=True)
    occupied = BooleanField(required=True)
    current_car_id = StringField()
    space_type = StringField(required=True, choices=["car", "motor", "priority"])
    floor = IntField(required=True)
    status = StringField(required=True, choices=["OK", "WARNING"])
    zone = StringField(required=True, choices=["A", "B", "C"])
    history = ListField(EmbeddedDocumentField(History))

    meta = {"collection": "parkingSpace"}


class Manager(Document):
    account = StringField(required=True, unique=True)
    password = StringField(required=True)
    login = BooleanField(required=True)
    name = StringField(required=True)

    meta = {"collection": "manager"}


class Message(Document):
    content = StringField(required=True)

    meta = {"collection": "message"}
