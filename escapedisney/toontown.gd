extends Control

@onready var password_input = $PasswordImput

const CORRECT_PASSWORD = "one"
const NEXT_SCENE_PATH = "res://fantasy.tscn"

func _on_button_pressed() -> void:
	var entered_password = password_input.text

	if entered_password == CORRECT_PASSWORD:
		get_tree().change_scene_to_file(NEXT_SCENE_PATH)
