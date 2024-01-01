import { useEffect, useRef } from "react";

//Make React useEffect hook not run on initial render
const useDidMountEffect = (func: () => void, deps: any[]) => {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) func();
		else didMount.current = true;
	}, deps);
};

export default useDidMountEffect;
