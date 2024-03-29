import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { type FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

import { dashboardThunks } from '../store/features/dashboard/dashboardThunks';
import { useAppDispatch } from '../store/hooks';
import { Avatar } from './Avatar';

export type TaskItem = {
	taskId: string;
	categoryId: string;
	title: string;
	description: string;
	priority: string;
	avatar?: string;
};

export type TaskProps = {
	task: TaskItem;
	index: number; // Index of task in the array
};

export const Task: FC<TaskProps> = ({ task, index }) => {
	const dispatch = useAppDispatch();
	const deleteHandler = (categoryId: string, task: TaskItem) => {
		dispatch(dashboardThunks.deleteTask({ categoryId, task }));
	};
	const navigate = useNavigate();

	return (
		<Draggable draggableId={task.taskId} index={index}>
			{(provided, snapshot) => {
				return (
					<div
						className="card w-80 h-28 bg-neutral rounded-md flex flex-row p-2 mb-2"
						{...provided.dragHandleProps}
						{...provided.draggableProps}
						ref={provided.innerRef}
						style={
							snapshot.isDragging
								? { ...provided.draggableProps.style, border: '1px solid white', backgroundColor: '#213547' }
								: { ...provided.draggableProps.style }
						}>
						<div className="left-block flex flex-col">
							<span
								className="mb-2 break-words w-64 hover:cursor-pointer hover:underline"
								onClick={() => navigate(`/category/${task.categoryId}/task/${task.taskId}`)}>
								{task.title ?? 'Название задачи'}
							</span>

							<div className="flex flex-row mt-auto">
								<div className="text-sm text-slate-300">Приоритет {task.priority ?? 'Priority'}</div>
							</div>
						</div>

						<div className="right-block ml-auto flex flex-col justify-between">
							<Avatar avatar={task.avatar} />

							<div
								// Set data-attributes to this div to disable drag and allow dropdown to work
								data-rbd-drag-handle-context-id={provided.dragHandleProps?.['data-rbd-drag-handle-context-id']}
								data-rbd-drag-handle-draggable-id="gibberish"
								style={{
									cursor: 'auto',
								}}
								className="flex dropdown dropdown-end">
								<button className="max-w-fit bg-transparent rounded-md focus:bg-slate-400 hover:bg-slate-400 ml-2">
									<EllipsisHorizontalIcon className="h-6 w-6 text-white self-center" />
								</button>
								<ul className="dropdown-content menu shadow bg-neutral rounded-box mt-6">
									<li>
										<button
											onClick={() => navigate(`/category/${task.categoryId}/task/${task.taskId}`)}
											className="hover:bg-slate-400 font-bold">
											Редактировать
										</button>
									</li>
									<li>
										<button
											draggable={false}
											onClick={() => deleteHandler(task.categoryId, task)}
											className="hover:bg-slate-400 text-red-500 font-bold">
											Удалить
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				);
			}}
		</Draggable>
	);
};
