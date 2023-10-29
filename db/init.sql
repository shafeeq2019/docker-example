-- Create a sample database and table
CREATE TABLE blogs (id serial primary key, category text, text text);

INSERT INTO
    blogs (category, text)
VALUES
    ('Book Review', 'The Name of the Wind'),
    ('Game Review', 'Pokemon Brillian Diamond'),
    ('Show Review', 'Alice in Borderland');