import './styles.css'

import {useState, useEffect, useRef} from 'react';

import {Box} from '@mui/material'

//https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element
const useContainerDimensions = myRef => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current.offsetWidth,
      height: myRef.current.offsetHeight
    })

    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

function ReditelskyFB() {
  const componentRef = useRef()
  const { width, height } = useContainerDimensions(componentRef)
  return (
    <Box ref={componentRef}>
      <div class="h_iframe">
        <iframe src={"https://www.facebook.com/plugins/page.php?href=DELTA.SSIE&tabs=timeline&width=" + width + "&height=" + height + "&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId%22"} frameborder="0" allowfullscreen></iframe>
      </div>
    </Box>
  );
}

export default ReditelskyFB;