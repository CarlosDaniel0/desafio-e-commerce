import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"
import { fromScoreToStars } from "../../util/convert"

const Stars = ({ children, span }) => {
  function generateStars(score) {
    const splitScore = `${score}`.split(".")
    let stars = []

    for (let i = 0; i < splitScore[0]; i++) {
      stars.push(<FaStar className='text-indigo-500' />)
    }
    if (splitScore[1] == 5)
      stars.push(<FaStarHalfAlt className='text-indigo-500' />)

    for (let i = 0; i < 5 - splitScore[0]; i++) {
      stars.push(<FaRegStar className='text-indigo-500' />)
    }

    if (stars.length > 5) stars.pop()
    return stars
  }

  return (
    <div className='flex'>
      {generateStars(fromScoreToStars(children))}
      {span && (
        <span className='rounded-md shadow absolute top-4 bg-white px-4 py-1 right-2'>
          {children}
        </span>
      )}
    </div>
  )
}

export default Stars
