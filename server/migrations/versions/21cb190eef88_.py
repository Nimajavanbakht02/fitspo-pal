"""empty message

Revision ID: 21cb190eef88
Revises: 
Create Date: 2024-07-07 14:10:27.762415

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '21cb190eef88'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('_password_hash', sa.String(length=200), nullable=False),
    sa.Column('profile_pic', sa.String(length=500), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users')),
    sa.UniqueConstraint('email', name=op.f('uq_users_email')),
    sa.UniqueConstraint('username', name=op.f('uq_users_username'))
    )
    op.create_table('friendships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('friend_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['friend_id'], ['users.id'], name=op.f('fk_friendships_friend_id_users')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_friendships_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_friendships'))
    )
    op.create_table('goals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=False),
    sa.Column('target_date', sa.Date(), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.ForeignKeyConstraint(['username'], ['users.username'], name=op.f('fk_goals_username_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_goals'))
    )
    op.create_table('workouts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('duration', sa.Integer(), nullable=False),
    sa.Column('calories_burned', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=True),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.ForeignKeyConstraint(['username'], ['users.username'], name=op.f('fk_workouts_username_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_workouts'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('workouts')
    op.drop_table('goals')
    op.drop_table('friendships')
    op.drop_table('users')
    # ### end Alembic commands ###