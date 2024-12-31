"""create question table

Revision ID: 5369abc7a57c
Revises: 
Create Date: 2024-12-29 17:49:42.803348

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5369abc7a57c'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'question',
        sa.Column('id',sa.Integer, primary_key=True),
        sa.Column('question',sa.String),
        sa.Column('answer',sa.String)
    )


def downgrade() -> None:
    op.drop_table('question')
