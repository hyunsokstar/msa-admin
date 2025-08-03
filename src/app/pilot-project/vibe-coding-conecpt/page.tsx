import React from 'react';
import { Code, Trophy } from 'lucide-react';
import VibeCodingCommandment from './ui/VibeCodingCommandment';
import RefArticleForVibeCoding from './ui/RefArticleForVibeCoding';

interface Props {

}

const VibeCodingPage = (props: Props) => {
    return (
        <div className="min-h-screen bg-background">


            {/* Main Content - 2 Column Layout */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="">
                        {/* Left Column - 10 Commandments */}
                        <div>
                            <VibeCodingCommandment />
                        </div>

                        {/* Right Column - Action Plans */}
                        <div>
                            <RefArticleForVibeCoding />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default VibeCodingPage;