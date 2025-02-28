'use server';

import {DataTypes} from "sequelize";

import {Sequelize} from 'sequelize';

// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite:/sqlite.db') // Example for sqlite

const NewsArticle = sequelize.define(
    'NewsArticle',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
);

const InfoArticle = sequelize.define(
    'InfoArticle',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
)

const NewsComment = sequelize.define(
    'NewsComment',
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },

    },
)

const User = sequelize.define(
    "User",
    {

    }
)

export async function getNews() {
    return NewsArticle.findAll({limit: 5, offset: 0});
}

export async function addNews(content: string) {
    return await NewsArticle.create({content: content});
}

export async function getArticle() {
    return NewsArticle.findAll();
}

export async function addArticle(content: string) {
    return await NewsArticle.create({content: content});
}

void NewsArticle.sync()
void InfoArticle.sync()
