package db

import (
	"database/sql"
	"fmt"
)

type UserRepository interface {
	Create() error
}

type UserRepositoryIml struct {
	db *sql.DB
}

func NewUserRepository(_db *sql.DB) UserRepository {
	return &UserRepositoryIml{
		db: _db,
	}
}

func (u *UserRepositoryIml) Create() error {
	fmt.Println("Creating user in User Repository")
	return nil
}
