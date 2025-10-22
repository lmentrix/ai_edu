'use client'

import React from 'react'
import EssayBox from "@/components/widgets/EssayBox";
import EssayStyle from "@/components/widgets/EssayStyle";
import Humanize from "@/components/widgets/Humanize";
import { FuturisticBackground } from "@/components/ui/futuristic-background";
import GeneratedEssay from "@/components/widgets/GeneratedEssay";

const Page = () => {
    return (
        <div className="min-h-screen relative">
            <FuturisticBackground />
            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold futuristic-heading mb-2">Essay Writing Assistant</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Create, refine, and perfect your essays with AI-powered tools. Generate content,
                        adjust writing styles, and humanize your text for natural, engaging writing.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Essay Editor - Takes 2 columns on large screens */}
                    <div className="lg:col-span-2">
                        <EssayBox />
                        <GeneratedEssay/>
                    </div>

                    {/* Sidebar Tools - Takes 1 column on large screens */}
                    <div className="space-y-6">
                        <EssayStyle />
                        <Humanize />
                    </div>
                </div>

                {/* Additional Features Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="futuristic-card p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Smart Generation</h3>
                        <p className="text-sm text-muted-foreground">
                            Generate well-structured essays with proper formatting and coherent arguments
                        </p>
                    </div>

                    <div className="futuristic-card p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Style Adaptation</h3>
                        <p className="text-sm text-muted-foreground">
                            Transform your writing to match different academic and professional styles
                        </p>
                    </div>

                    <div className="futuristic-card p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Natural Writing</h3>
                        <p className="text-sm text-muted-foreground">
                            Humanize AI-generated text to sound natural and engaging
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
