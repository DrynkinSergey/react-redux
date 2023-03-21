import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

const todoSlice = createSlice({
	name: '@@todoList',
	initialState: {
		tasks: [],
		filter: 'all',
	},
	reducers: {
		addTodo(state, action) {
			state.tasks.push({
				id: nanoid(),
				title: action.payload,
				completed: false,
			})
		},
		removeTodo(state, action) {
			const itemIndex = state.tasks.findIndex(
				task => task.id === action.payload
			)
			state.tasks.splice(itemIndex, 1)
		},
		toggleTodo(state, action) {
			const todo = state.tasks.find(task => task.id === action.payload)
			todo.completed = !todo.completed
		},
		changeFilter(state, action) {
			state.filter = action.payload
		},
	},
})

export const todoReducer = todoSlice.reducer
export const { addTodo, toggleTodo, changeFilter, removeTodo } =
	todoSlice.actions