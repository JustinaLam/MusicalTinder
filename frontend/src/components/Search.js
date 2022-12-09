import React from "react";

function Homepage() {
    // const navigate = useNavigate();

    const onChange = (val) => {
      console.log(val)
    }

    return (
        <div className="w-full h-screen flex flex-col items-center bg-opacity-10 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 p-24">
            <input type="text" placeholder="Search anything!" className="w-[600px] h-16 flex flex-row items-center justify-center space-x-4 bg-white mt-10 p-4 rounded-full opacity-90 shadow hover:shadow-2xl ease-in transition-shadow" />
            <div className="w-[600px] bg-white mt-10 p-4 rounded opacity-90 flex flex-col space-y-10">
                <table>
                    <tr>
                        <th>Duration</th>
                        <th>
                            <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" onChange={onChange} />
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Homepage;