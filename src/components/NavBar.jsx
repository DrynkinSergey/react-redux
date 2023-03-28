import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logOut } from '../redux/auth/operations'
import { selectIsLoggedIn } from '../redux/auth/selectors'

export const NavBar = () => {
	const dispatch = useDispatch()
	const isLoggedin = useSelector(selectIsLoggedIn)
	const name = useSelector(state => state.auth.user.name)
	return (
		<header className='text-2xl text-white font-bold py-6 px-4 bg-cyan-600 flex justify-between gap-6'>
			<div className='flex gap-4'>
				<NavLink to='/'>Home</NavLink>
				{isLoggedin && <NavLink to='/posts'>Posts</NavLink>}
				<NavLink to='/private'>Private</NavLink>
			</div>
			{!isLoggedin ? (
				<div>
					<NavLink to='/login'>login</NavLink> |{' '}
					<NavLink to='/registration'>signUp</NavLink>
				</div>
			) : (
				<div className='flex gap-4'>
					<h1>
						Welcome, <span className='text-black'>{name}</span>
					</h1>
					<button
						className='border px-2 bg-red-500'
						onClick={() => dispatch(logOut())}
					>
						LogOut
					</button>
				</div>
			)}
		</header>
	)
}
