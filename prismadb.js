const fs = require('fs');

class PrismaDB
{
    static version = "v1";
    static #databasePath;
    #buffer = {}

    constructor (path)
    {
        try
        {
            this.databasePath = path;
            if (!fs.existsSync(path)) fs.writeFileSync(path,"{}");
        } catch (exception) { this.#GiveWarning("Create Database",exception); }
    }
    Pull()
    {
        try
        {
            this.#buffer = JSON.parse(fs.readFileSync(this.databasePath));
        } catch (exception) { this.#GiveWarning("Create Database",exception); }
    }
    Push()
    {
        try
        {
            fs.writeFileSync(this.databasePath,JSON.stringify(this.#buffer));
        } catch (exception) { this.#GiveWarning("Create Database",exception); }
    }
    Write(key,data)
    {
        try
        {
            if (!(key in this.#buffer)) this.#buffer[key] = data;
        } catch (exception) { this.#GiveWarning("Write",exception); }
    }
    Read(key)
    {
        try
        {
            return this.#buffer[key];
        } catch (exception) { this.#GiveWarning("Read",exception); }
    }
    Delete(key)
    {
        try
        {
            delete this.#buffer[key];
        } catch (exception) { this.#GiveWarning("Delete",exception); }
    }
    Replace(key,data)
    {
        try
        {
            if (key in this.#buffer) this.#buffer[key] = data;
        } catch (exception) { this.#GiveWarning("Replace",exception); }
    }
    ReadDataStartsWith(startsWith)
    {
        try
        {
            var dict = {};

            for (const [key, value] of Object.entries(this.#buffer))
            {
                if (key.startsWith(startsWith)) dict[key] = value;
            }

            return dict;
        } catch (exception) { this.#GiveWarning("Read Data Starts With",exception); }
    }
    ReadDataEndsWith(endsWith)
    {
        try
        {
            var dict = {};

            for (const [key, value] of Object.entries(this.#buffer))
            {
                if (key.endsWith(endsWith)) dict[key] = value;
            }

            return dict;
        } catch (exception) { this.#GiveWarning("Read Data Ends With",exception); }
    }
    ReadAllData()
    {
        try
        {
            return this.#buffer;
        } catch (exception) { this.#GiveWarning("Read All Data",exception); }
    }
    DisposeBuffer()
    {
        try
        {
            this.#buffer = {};
        } catch (exception) { this.#GiveWarning("Dispose Buffer",exception); }
    }
    #GiveWarning(operation,exception) 
    {
        console.log(`Something went wrong in PrismaDB ${operation} Operation: ` + exception);
    }
}

module.exports = PrismaDB;