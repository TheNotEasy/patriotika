import {Sequelize, DataTypes, Model} from "sequelize";
import pg from 'pg';
import SequelizeAdapter, {models} from "@auth/sequelize-adapter";

if (process.env.DATABASE_URL === undefined) {
  throw Error("DATABASE_URL is empty");
}

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
});

export const NewsArticle = sequelize.define(
  'NewsArticle',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
);

export const InfoArticle = sequelize.define(
  'InfoArticle',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
)

export const NewsComment = sequelize.define(
  'NewsComment',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
)

export const Vote = sequelize.define(
  "vote",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    targetId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }
)

export const UserAttributes = {
  ...models.User,
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
} as const;

export const User = sequelize.define<Model<typeof UserAttributes>>("user", UserAttributes);

export const adapter = SequelizeAdapter(sequelize, {
  models: {
    User: User as any
  }
});

// export const UserNewsComments = User.hasMany(NewsComment);
// export const NewsCommentUser = NewsComment.belongsTo(User);
//
// export const UserVotes = User.hasMany(Vote);
// export const VoteUser = Vote.belongsTo(User);
