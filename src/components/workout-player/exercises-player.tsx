import { useEffect, useState } from "react";
import { CompletedExcercise, ExercisePlayer } from "./exercise-player";
import { ProgramExcercise } from "../../services/program-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export const ExercisesPlayer = ({
	exercises,
	onFinish,
}: {
	exercises: ProgramExcercise[];
	onFinish: (ce: CompletedExcercise[]) => void;
}) => {
	const [restExercises, setRestExercises] = useState<ProgramExcercise[]>(
		() => [...exercises]
	);
	const [completedExercises, setCompletedExercises] = useState<
		CompletedExcercise[]
	>([]);

	useEffect(() => {
		setRestExercises([...exercises]);
		setCompletedExercises([]);
	}, [exercises]);

	useEffect(() => {
		if (restExercises.length === 0) {
			onFinish(completedExercises);
		} else {
			const lastEx = completedExercises.at(-1);
			if (lastEx) {
				const rest = restExercises.filter(
					(e) => e.name !== lastEx.name
				);
				if (restExercises.length > rest.length) {
					setRestExercises(rest);
				}
			}
		}
	}, [completedExercises, restExercises, onFinish]);

	const handleFinishExercise = (ex: CompletedExcercise) => {
		if (completedExercises.find((e) => e.name === ex.name)) {
			throw new Error("Excercise already finished!");
		}
		setCompletedExercises([...completedExercises, ex]);
	};

	return (
		<Swiper
			slidesPerView={1}
			spaceBetween={50}
			pagination={{
				clickable: true,
			}}
			navigation={true}
			modules={[Pagination]}
		>
			{restExercises.map((re, idx) => (
				<SwiperSlide key={re.name}>
					<ExercisePlayer
						exercise={re}
						onFinish={handleFinishExercise}
					/>
					<div style={{ marginTop: "20px" }} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};
