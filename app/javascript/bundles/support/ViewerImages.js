import React, { CSSProperties } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { map } from 'lodash';

export default class ViewerImages extends React.Component {

    render() {
        return (
            <Carousel showArrows={true}
                infiniteLoop
                centerMode>
                {
                    map(this.props.images, (img, i) => {
                        return (
                            <div key={`img_${i}`} >
                                <img src={img} alt={`Image ${i}`} />
                                <p className="legend">Image {i}</p>
                            </div>
                        )
                    })
                }
            </Carousel>

        )
    }
}
