import PropTypes from 'prop-types'

function MarqueeDoctorList(props) {
    return <>

        <div className=" w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-7 bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
            <img className=" w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
            <div className=" self-stretch text-center text-white text-xl font-bold   tracking-widest">{props.docName}</div>
            <div className=" self-stretch text-center text-white text-xl font-bold   tracking-widest">{props.docRole}</div>
            <button className=" top-[13px] w-[180.42px] h-[50px]  relative rounded-[10px] border-2 border-white  text-white text-xl font-semibold   tracking-widest">View Profile</button>
        </div>
    </>
}
MarqueeDoctorList.PropTypes = {
    docName: PropTypes.string,
    docRole: PropTypes.string,
}

export default MarqueeDoctorList;