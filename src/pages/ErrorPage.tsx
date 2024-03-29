import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { Paths } from '../routes/router';

export const ErrorPage: FC = () => {
	return (
		<div className="hero min-h-screen ">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">Ошибка</h1>
					<p className="py-6">Произошла ошибка. Возможно, данной страницы не существует.</p>
					<Link to={Paths.Home} relative="path" className="btn btn-primary">
						Вернуться на главную
					</Link>
				</div>
			</div>
		</div>
	);
};
