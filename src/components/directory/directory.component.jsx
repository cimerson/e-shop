import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selecDirectorySection } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';


const Directory = ({ sections }) => {

    return (
        <div className='directory-menu'>
            {
                // this.state.sections.map(({title, imageUrl, id, size}) => (
                sections.map(({ id, ...otherSectionProps }) => (
                    // <MenuItem key={id} title={title} imageUrl={imageUrl} size={size}/>
                    <MenuItem key={id} {...otherSectionProps} />
                ))
            }
        </div>
    )

};

const mapStateToProps = createStructuredSelector({
    sections : selecDirectorySection
})

export default connect(mapStateToProps)(Directory);
