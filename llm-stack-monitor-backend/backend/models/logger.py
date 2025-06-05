from sqlalchemy import (
    Column, Integer, String, Float, DateTime, ForeignKey, Table, Text, Index, JSON
)
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime
from db.base import Base

# Association Table for Many-to-Many: Generation <-> Tags
generation_tag_link = Table(
    "generation_tag_link",
    Base.metadata,
    Column("generation_id", Integer, ForeignKey("generation.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True)
)


class Tags(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, autoincrement=True)
    label = Column(String, nullable=False, index=True)

    generations = relationship(
        "Generation",
        secondary=generation_tag_link,
        back_populates="tags"
    )


class Message(Base):
    __tablename__ = "message"

    id = Column(Integer, primary_key=True, autoincrement=True)
    system = Column(Text, nullable=True)
    user = Column(Text, nullable=True)
    assistant = Column(Text, nullable=True)

    generation = relationship("Generation", back_populates="message", uselist=False)


class Generation(Base):
    __tablename__ = "generation"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    user_id = Column(Integer, nullable=False, index=True)
    trace_id = Column(String, nullable=False, index=True)
    message_id = Column(Integer, ForeignKey("message.id"), nullable=False)

    tags = relationship(
        "Tags",
        secondary=generation_tag_link,
        back_populates="generations"
    )
    message = relationship("Message", back_populates="generation", uselist=False)


class TraceData(Base):
    __tablename__ = "trace_data"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False, index=True)
    trace_id = Column(String, nullable=False, unique=True, index=True)
    model = Column(String, nullable=False)
    duration = Column(Float, nullable=False)
    prompt_tokens = Column(Integer, nullable=False)
    completion_tokens = Column(Integer, nullable=False)
    total_tokens = Column(Integer, nullable=False)
    start_time = Column(DateTime, nullable=False, default=datetime.utcnow)
    end_time = Column(DateTime, nullable=True)
    meta_data  = Column(JSON, nullable=True)  

# Optional index definitions (if needed explicitly beyond Column(index=True))
Index("ix_trace_user_id", TraceData.user_id)
Index("ix_trace_trace_id", TraceData.trace_id, unique=True)
