package db

import (
	"AuthService/models"
	"database/sql"
	"fmt"
)

// UserRepository defines the contract for user-related database operations.
type UserRepository interface {
	GetById(id string) (*models.User, error)
	Create(username string, email string, hashedPassword string) (*models.User, error)
	GetByEmail(email string) (*models.User, error)
	GetAll() ([]*models.User, error)
	DeleteByID(id int64) error
}

// UserRepositoryImpl provides the concrete implementation of UserRepository.
type UserRepositoryImpl struct {
	db *sql.DB
}

// NewUserRepository initializes a new UserRepositoryImpl.
func NewUserRepository(_db *sql.DB) UserRepository {
	return &UserRepositoryImpl{
		db: _db,
	}
}

// GetById retrieves a user from the database by their ID.
func (u *UserRepositoryImpl) GetById(id string) (*models.User, error) {
	fmt.Println("Fetching user by ID in UserRepository")

	query := "SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?"
	row := u.db.QueryRow(query, id)

	user := &models.User{}
	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No user found with the given ID")
			return nil, err
		}
		fmt.Println("Error scanning user:", err)
		return nil, err
	}

	fmt.Println("User fetched successfully:", user)
	return user, nil
}

// GetByEmail retrieves a user from the database by their email.
func (u *UserRepositoryImpl) GetByEmail(email string) (*models.User, error) {
	fmt.Println("Fetching user by email in UserRepository")

	query := "SELECT id, email, password FROM users WHERE email = ?"
	row := u.db.QueryRow(query, email)

	user := &models.User{}
	err := row.Scan(&user.Id, &user.Email, &user.Password) // password is hashed
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No user found with the given email")
			return nil, err
		}
		fmt.Println("Error scanning user:", err)
		return nil, err
	}

	fmt.Println("User fetched successfully:", user)
	return user, nil
}

// Create inserts a new user into the database and returns the created record.
func (u *UserRepositoryImpl) Create(username string, email string, hashedPassword string) (*models.User, error) {
	fmt.Println("Creating user in UserRepository")

	query := "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
	result, err := u.db.Exec(query, username, email, hashedPassword)
	if err != nil {
		fmt.Println("Error creating user:", err)
		return nil, err
	}

	lastInsertID, rowErr := result.LastInsertId()
	if rowErr != nil {
		fmt.Println("Error getting last insert ID:", rowErr)
		return nil, rowErr
	}

	user := &models.User{
		Id:       lastInsertID,
		Username: username,
		Email:    email,
	}

	fmt.Println("User created successfully:", user)
	return user, nil
}

// GetAll retrieves all users from the database.
func (u *UserRepositoryImpl) GetAll() ([]*models.User, error) {
	fmt.Println("Fetching all users in UserRepository")

	query := "SELECT id, username, email, created_at, updated_at FROM users"
	rows, err := u.db.Query(query)
	if err != nil {
		fmt.Println("Error fetching users:", err)
		return nil, err
	}
	defer rows.Close()

	var users []*models.User
	for rows.Next() {
		user := &models.User{}
		if err := rows.Scan(&user.Id, &user.Username, &user.Email, &user.CreatedAt, &user.UpdatedAt); err != nil {
			fmt.Println("Error scanning user:", err)
			return nil, err
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error with rows:", err)
		return nil, err
	}

	fmt.Println("Users fetched successfully, count:", len(users))
	return users, nil
}

// DeleteByID removes a user from the database by their ID.
func (u *UserRepositoryImpl) DeleteByID(id int64) error {
	fmt.Println("Deleting user by ID in UserRepository")

	query := "DELETE FROM users WHERE id = ?"
	result, err := u.db.Exec(query, id)
	if err != nil {
		fmt.Println("Error deleting user:", err)
		return err
	}

	rowsAffected, rowErr := result.RowsAffected()
	if rowErr != nil {
		fmt.Println("Error getting rows affected:", rowErr)
		return rowErr
	}
	if rowsAffected == 0 {
		fmt.Println("No rows were affected, user not deleted")
		return nil
	}

	fmt.Println("User deleted successfully, rows affected:", rowsAffected)
	return nil
}
