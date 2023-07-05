db.createUser(
    {
        user: "api",
        pwd: "dev-pass",
        roles: [
            {
                role: "readWrite",
                db: "praxis"
            }
        ]
    }
);

praxis = db.getSiblingDB('praxis');
praxis.createCollection('profiles');