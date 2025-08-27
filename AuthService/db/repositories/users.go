package db

import (
	"AuthService/models"
	"database/sql"
	"fmt"
)

type UserRepository interface {
	GetById() (*models.User, error)
}

type UserRepositoryIml struct {
	db *sql.DB
}

func NewUserRepository(_db *sql.DB) UserRepository {
	return &UserRepositoryIml{
		db: _db,
	}
}

func (u *UserRepositoryIml) GetById() (*models.User, error) {
	fmt.Println("Creating user in User Repository")

	query := "SELECT id, username, email, password, created_at, updated_at FROM users WHERE id = ?"

	row := u.db.QueryRow(query, 1)

	user := &models.User{}

	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.Password, &user.Created_at, &user.UpdatedAt)

	fmt.Println(err)

	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No user found with the given ID")
			return nil, err
		} else {
			fmt.Println("Error scanning user:", err)
			return nil, err
		}
	}

	fmt.Println("User fetched successfully:", user)

	return user, nil
}
