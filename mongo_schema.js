// ============================================================
// mongo_schema.js — MongoDB collection setup
// Run with: mongosh < mongo_schema.js
// ============================================================

// Select database
use("internship_db");

// Drop existing collection (optional, for fresh setup)
// db.profiles.drop();

// Create collection with schema validation
db.createCollection("profiles", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id"],
            properties: {
                user_id: {
                    bsonType:    "int",
                    description: "MySQL user ID — must be an integer"
                },
                age: {
                    bsonType:    "string",
                    description: "User age as string"
                },
                dob: {
                    bsonType:    "string",
                    description: "Date of birth in YYYY-MM-DD format"
                },
                contact: {
                    bsonType:    "string",
                    description: "Contact phone number"
                },
                address: {
                    bsonType:    "string",
                    description: "User address"
                },
                bio: {
                    bsonType:    "string",
                    description: "Short biography"
                },
                updated_at: {
                    bsonType:    "date",
                    description: "Last profile update timestamp"
                }
            }
        }
    },
    validationLevel:  "moderate",
    validationAction: "warn"
});

// Create unique index on user_id for fast lookups
db.profiles.createIndex(
    { user_id: 1 },
    { unique: true, name: "idx_user_id" }
);

print("MongoDB profiles collection created with validation and index.");
