from sqlmodel import SQLModel, Field
from typing import Optional

class PokemonCard (SQLModel, table = True):
    id: Optional[int] = Field(default = None, primary_key = True)
    title:str
    image_url: str
    