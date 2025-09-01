package controllers

import (
	"AuthService/dto"
	"AuthService/services"
	"AuthService/utils"
	"fmt"
	"net/http"
)

// UserController handles HTTP requests related to users.
type UserController struct {
	UserService services.UserService
}

// NewUserController creates a new UserController.
func NewUserController(_userService services.UserService) *UserController {
	return &UserController{
		UserService: _userService,
	}
}

// GetUserById handles fetching a user by ID.
func (uc *UserController) GetUserById(w http.ResponseWriter, r *http.Request) {
	fmt.Println("UserController: fetching user by ID")

	userId := r.URL.Query().Get("id")
	if userId == "" {
		userId = r.Context().Value("userID").(string)
	}
	fmt.Println("UserController: userId =", userId)

	if userId == "" {
		utils.WriteJsonErrorResponse(w, http.StatusBadRequest, "User ID is required", fmt.Errorf("missing user ID"))
		return
	}

	user, err := uc.UserService.GetUserById(userId)
	if err != nil {
		utils.WriteJsonErrorResponse(w, http.StatusInternalServerError, "Failed to fetch user", err)
		return
	}
	if user == nil {
		utils.WriteJsonErrorResponse(w, http.StatusNotFound, "User not found", fmt.Errorf("user with ID %s not found", userId))
		return
	}

	utils.WriteJsonSuccessResponse(w, http.StatusOK, "User fetched successfully", user)
	fmt.Println("UserController: user fetched successfully")
}

// CreateUser handles creating a new user.
func (uc *UserController) CreateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("UserController: creating user")

	payload := r.Context().Value("payload").(dto.CreateUserRequestDTO)
	fmt.Println("UserController: payload received")

	user, err := uc.UserService.CreateUser(&payload)
	if err != nil {
		utils.WriteJsonErrorResponse(w, http.StatusInternalServerError, "Failed to create user", err)
		return
	}

	utils.WriteJsonSuccessResponse(w, http.StatusCreated, "User created successfully", user)
	fmt.Println("UserController: user created successfully")
}

// LoginUser handles user login and returns a JWT token.
func (uc *UserController) LoginUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("UserController: logging in user")

	payload := r.Context().Value("payload").(dto.LoginUserRequestDTO)
	fmt.Println("UserController: payload received")

	jwtToken, err := uc.UserService.LoginUser(&payload)
	if err != nil {
		utils.WriteJsonErrorResponse(w, http.StatusInternalServerError, "Failed to login user", err)
		return
	}

	utils.WriteJsonSuccessResponse(w, http.StatusOK, "User logged in successfully", jwtToken)
	fmt.Println("UserController: user logged in successfully")
}
