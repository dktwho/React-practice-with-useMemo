import './App.css';
import {useState, useCallback, useEffect, useMemo} from 'react'
import {Container} from 'react-bootstrap';

const countTotal = (num) => {
  console.log ('counting...')
  return num + 10
}

  const Slider = () => {
  const [slide, setSlide]= useState(0)  
  const [autoplay, setAutoplay] = useState(false)

  const changeSlide = (i) => {
    setSlide(slide => slide + 1)
  } 

  const toggleAutoplay = () => {
    setAutoplay(autoplay => !autoplay)
  }

  const getSomeImages = useCallback(() => {
    console.log('fetching')
    return [
      'https://www.planetware.com/wpimages/2023/02/scotland-dumfries-top-things-to-do-intro-paragraph-town-river.jpg',
      'https://www.planetware.com/wpimages/2023/02/scotland-dumfries-top-things-to-do-admire-history-caerlaverock-castle.jpg',
    ]
  }, [])

  const total = useMemo(() => {
    return countTotal(slide)
  }, [slide]) 

  const style = useMemo(() => ({
      color: slide > 4 ? 'red' : 'green'
  }), [slide])

  useEffect(() => {
    console.log('style!')
  }, [style])

  return (
    <Container>
    <div className="slider w-50 m-auto">
         
         <Slide getSomeImages={getSomeImages} />
        <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
        <div style={style} className="text-center mt-5">Total slide: {total} </div>
        <div className="buttons mt-3">
            <button 
                className="btn btn-primary me-2"
                onClick={() => changeSlide(+1)}>-1</button>
            <button 
                className="btn btn-primary me-2"
                onClick={() => changeSlide(-1)}>-1</button>
            <button 
                className="btn btn-primary me-2"
                onClick={toggleAutoplay}>toggle autoplay</button>
        </div>
    </div>
</Container>
  );
  }

const Slide = ({getSomeImages}) => {
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(getSomeImages())
  }, [getSomeImages])

  return (
    <>
      {images.map((url,i) =>  <img  key={i}   src={url}    className="d-block w-100"   alt="slide" />   )} 
    </>
  )
}

function App() {
  const [slider, setSlider] = useState(true)
  return (
    <>
      <button onClick={() => setSlider(!slider)}>click</button>
      {slider ? <Slider/> : null}
    </>
  )
}

export default App;
