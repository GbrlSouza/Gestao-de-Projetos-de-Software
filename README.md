# Gestao-de-Projetos-de-Software

- PHPMyAdmin XAMPP

```mysql
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    name VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    status ENUM('Not Started', 'In Progress', 'Completed'),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

ALTER TABLE tasks 
ADD COLUMN dependency_ids VARCHAR(255);
```