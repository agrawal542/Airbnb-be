package db

import (
	"fmt"
)

type UserRepository interface {
	Create() error
}

type UserRepositoryIml struct {
	// db *sql.DB
}

func NewUserRepository() UserRepository {
	return &UserRepositoryIml{
		// db: db,
	}
}

func (u *UserRepositoryIml) Create() error {
	fmt.Println("Creating user in User Repository")
	return nil
}
