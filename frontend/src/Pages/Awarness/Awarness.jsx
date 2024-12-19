import React from "react";
import './Awarness.css';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { assets } from '../../assets/assets';

export default function Awareness() {
    return (
        <>
            <Navbar page={"awareness"}/>
            <div className="awarness container my-5">
                <h1 className="mb-4">Agriculture Data</h1>
                
                <section className="mb-5">
                    <h2>Local Agriculture</h2>
                    <p>Local agriculture refers to farming practices and food production that take place within a specific geographic area, typically close to where the food is consumed. It emphasizes growing crops and raising livestock in a way that supports the local economy and community.</p>
                    <h3>Importance or Benefits</h3>
                    <ul>
                        <li>Economic benefits: Local farms contribute to the economy by creating jobs and supporting local businesses.</li>
                        <li>Reducing carbon footprint: It encourages sustainable farming practices and helps maintain local biodiversity.</li>
                        <li>Food security: Communities become less reliant on global supply chains, which can be vulnerable to disruptions.</li>
                        <li>Value of product increases: Locally grown produce is often fresher, nutrient-dense, and does not require lengthy transportation.</li>
                        <li>Community Engagement: Fosters a sense of community and connection between producers and consumers.</li>
                        <li>Sustainability: Contributes to more sustainable farming practices by reducing transportation emissions and promoting land conservation.</li>
                    </ul>
                    <div className="text-center">
                        <img src={assets.localagri} alt="Local Agriculture" className="img-fluid page-img" />
                    </div>
                    <h3>Types of Local Agriculture</h3>
                    <ul>
                        <li>Urban Agriculture: Farming activities conducted within city environments or metropolitan areas.</li>
                        <li>Rural Agriculture: Traditional farming practices carried out in rural areas, typically involving larger plots of land and a range of agricultural activities.</li>
                        <li>Community-Supported Agriculture (CSA): A model where consumers purchase shares or subscriptions to receive regular deliveries of fresh produce from local farms.</li>
                        <li>Farm-to-Table: A movement that emphasizes sourcing food directly from local farms and serving it in restaurants or institutions.</li>
                        <li>Educational and Demonstration Farms: Institutions that provide hands-on training and education in farming practices.</li>
                    </ul>
                    <div className="text-center">
                        <img src={assets.riselocal} alt="Rise of Local Agriculture" className="img-fluid" />
                    </div>
                </section>

                <section className="mb-5">
                    <h2>Sustainable Food System</h2>
                    <p>A sustainable food system supports human health and well-being while also being environmentally friendly and economically viable. It meets present needs without compromising the ability of future generations to meet their own needs.</p>
                    <h3>Key Aspects</h3>
                    <ul>
                        <li>Environmental Impact: Minimizes harm to the environment by reducing pollution, conserving natural resources, and maintaining biodiversity.</li>
                        <li>Economic Viability: Ensures that food production and distribution are economically viable for all participants, from farmers to consumers.</li>
                        <li>Social Equity: Addresses issues of food justice and ensures access to nutritious and culturally appropriate food for all.</li>
                        <li>Health and Nutrition: Promotes healthy and nutritious diets, reducing diet-related diseases and encouraging the consumption of whole, minimally processed foods.</li>
                        <li>Resilience: Builds resilience in the food system to withstand shocks such as climate change, economic instability, and pandemics.</li>
                    </ul>
                    <div className="text-center">
                        <img src={assets.sustainable} alt="Sustainable Food System" className="img-fluid" />
                    </div>
                    <h3>Food Waste Management Strategies</h3>
                    <ul>
                        <li>Composting</li>
                        <li>Food Redistribution</li>
                        <li>Waste-to-Energy</li>
                        <li>Education and Awareness</li>
                        <li>Food Recovery Programs</li>
                    </ul>
                    <div className="text-center">
                        <img src={assets.waste} alt="Food Waste Management" className="img-fluid" />
                    </div>
                </section>

                <section>
                    <h2>Crops Grown in India by Season</h2>
                    <div className="accordion" id="cropsAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="kharifHeading">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#kharifCollapse" aria-expanded="true" aria-controls="kharifCollapse">
                                    Kharif Season (June to September)
                                </button>
                            </h2>
                            <div id="kharifCollapse" className="accordion-collapse collapse show" aria-labelledby="kharifHeading">
                                <div className="accordion-body">
                                    <ul>
                                        <li>Rice: Predominantly grown in West Bengal, Uttar Pradesh, and Punjab.</li>
                                        <li>Maize (Corn): Found in Karnataka, Maharashtra, and Bihar.</li>
                                        <li>Cotton: Grown in Gujarat, Maharashtra, and Andhra Pradesh.</li>
                                        <li>Jowar (Sorghum): Common in Maharashtra, Karnataka, and Madhya Pradesh.</li>
                                        <li>Bajra (Pearl Millet): Cultivated in Rajasthan, Gujarat, and Haryana.</li>
                                        <li>Soybean: Majorly grown in Madhya Pradesh, Maharashtra, and Rajasthan.</li>
                                        <li>Groundnut (Peanut): Found in Gujarat, Andhra Pradesh, and Tamil Nadu.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="rabiHeading">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#rabiCollapse" aria-expanded="false" aria-controls="rabiCollapse">
                                    Rabi Season (October to March)
                                </button>
                            </h2>
                            <div id="rabiCollapse" className="accordion-collapse collapse" aria-labelledby="rabiHeading">
                                <div className="accordion-body">
                                    <ul>
                                        <li>Wheat: Majorly grown in Punjab, Haryana, Uttar Pradesh, and Madhya Pradesh.</li>
                                        <li>Barley: Cultivated in Rajasthan, Punjab, and Haryana.</li>
                                        <li>Mustard: Common in Haryana, Rajasthan, and Uttar Pradesh.</li>
                                        <li>Chickpeas (Gram): Found in Madhya Pradesh, Rajasthan, and Uttar Pradesh.</li>
                                        <li>Peas: Grown in Uttar Pradesh, Punjab, and Himachal Pradesh.</li>
                                        <li>Oats: Mainly grown in Himachal Pradesh, Uttarakhand, and some parts of Punjab and Haryana.</li>
                                        <li>Linseed: Cultivated in Madhya Pradesh, Rajasthan, and Gujarat.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="zaidHeading">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#zaidCollapse" aria-expanded="false" aria-controls="zaidCollapse">
                                    Zaid Season (March to June)
                                </button>
                            </h2>
                            <div id="zaidCollapse" className="accordion-collapse collapse" aria-labelledby="zaidHeading">
                                <div className="accordion-body">
                                    <ul>
                                        <li>Watermelon: Grown in Karnataka, Maharashtra, and Punjab.</li>
                                        <li>Cucumber: Cultivated in Gujarat, Maharashtra, and Uttar Pradesh.</li>
                                        <li>Lemon: Majorly found in Maharashtra, Gujarat, and Andhra Pradesh.</li>
                                        <li>Tomato: Grown in Karnataka, Maharashtra, and Andhra Pradesh.</li>
                                        <li>Pumpkin: Common in Karnataka, Tamil Nadu, and Uttar Pradesh.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="otherCropsHeading">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#otherCropsCollapse" aria-expanded="false" aria-controls="otherCropsCollapse">
                                    Other Seasonal Crops
                                </button>
                            </h2>
                            <div id="otherCropsCollapse" className="accordion-collapse collapse" aria-labelledby="otherCropsHeading">
                                <div className="accordion-body">
                                    <ul>
                                        <li>Sugarcane: Grown throughout the year, mainly harvested in Uttar Pradesh, Maharashtra, and Karnataka.</li>
                                        <li>Tea: Cultivated in Assam, West Bengal, and Kerala.</li>
                                        <li>Coffee: Mainly grown in Karnataka, Kerala, and Tamil Nadu.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
