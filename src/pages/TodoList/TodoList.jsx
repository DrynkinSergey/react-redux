import { Button, Todo, TodoTitle } from './TodoList.styled'
import { Flex } from './../../components/Flex.styled'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from '../../redux/slices/todoSlice'
import { applyFilters } from '../../redux/todoSelectors'
import { useEffect } from 'react'
import {
	createTask,
	fetchTasks,
	removeTask,
	toggleTask,
} from '../../redux/slices/thunks'

export const TodoList = () => {
	const filter = useSelector(state => state.filter)
	const filteredTasks = useSelector(state => applyFilters(state, filter))
	const dispatch = useDispatch()

	const handleSubmit = event => {
		event.preventDefault()
		dispatch(createTask(event.target.title.value))
		event.target.reset()
	}
	useEffect(() => {
		dispatch(fetchTasks())
	}, [dispatch])
	return (
		<Flex center>
			<div style={{ padding: '100px 0' }}>
				<h2>ADD Todo:</h2>
				<AddTodoForm onSubmit={handleSubmit}>
					<input type='text' name='title' />
					<button>Add</button>
				</AddTodoForm>
				<div style={{ padding: '15px 0', display: 'flex', gap: '10px' }}>
					<button
						///////////
						onClick={() => dispatch(changeFilter('all'))}
						///////////
						style={{ color: filter === 'all' ? 'red' : 'black' }}
					>
						All
					</button>
					<button
						///////////
						onClick={() => dispatch(changeFilter('active'))}
						//////////////
						style={{ color: filter === 'active' ? 'red' : 'black' }}
					>
						Active
					</button>
					<button
						//////////////
						onClick={() => dispatch(changeFilter('completed'))}
						////////////
						style={{ color: filter === 'completed' ? 'red' : 'black' }}
					>
						Completed
					</button>
				</div>
				<ul>
					{filteredTasks.length ? (
						filteredTasks.map(item => (
							<Todo key={item.id} isComplete={item.completed}>
								<input
									type='checkbox'
									onChange={() => dispatch(toggleTask(item))}
									checked={item.completed}
								/>
								<TodoTitle>{item.title} </TodoTitle>
								<Button onClick={() => dispatch(removeTask(item.id))}>
									Delete
								</Button>
							</Todo>
						))
					) : (
						<h1>Даних немає</h1>
					)}
				</ul>
			</div>
		</Flex>
	)
}

const AddTodoForm = styled.form`
	padding: 20px 0;
`
