import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function StatBoxes({ title, todaysStats, total }) {
	return (
		<div className='singleCard'>
			<Card variant='outlined'>
				<CardContent>
					<Typography color='textSecondary'>{title}</Typography>
					<Typography variant='h5' component='h2' className='todaysNumber'>
						{todaysStats}
					</Typography>
					<Typography color='textSecondary'>{total}</Typography>
				</CardContent>
			</Card>
		</div>
	);
}

export default StatBoxes;
