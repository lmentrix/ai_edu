"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { User, Sparkles, Loader2, GraduationCap, Coffee, Briefcase } from 'lucide-react'

const Humanize = () => {
    const [inputText, setInputText] = useState('')
    const [academicText, setAcademicText] = useState('')
    const [casualText, setCasualText] = useState('')
    const [professionalText, setProfessionalText] = useState('')
    const [isProcessing, setIsProcessing] = useState({
        academic: false,
        casual: false,
        professional: false
    })

    const humanizeStyles = [
        {
            key: 'academic',
            label: 'Academic',
            description: 'Formal, scholarly tone with proper citations',
            icon: GraduationCap,
            color: 'from-blue-500 to-blue-600',
            prompt: 'Transform this text to sound more academic and scholarly. Use formal language, proper terminology, and structured arguments suitable for academic writing.'
        },
        {
            key: 'casual',
            label: 'Casual',
            description: 'Relaxed, conversational tone',
            icon: Coffee,
            color: 'from-green-500 to-green-600',
            prompt: 'Transform this text to sound more casual and conversational. Use everyday language, contractions, and a friendly tone as if talking to a friend.'
        },
        {
            key: 'professional',
            label: 'Professional',
            description: 'Business-appropriate, polished tone',
            icon: Briefcase,
            color: 'from-purple-500 to-purple-600',
            prompt: 'Transform this text to sound more professional and business-appropriate. Use clear, concise language with a polished tone suitable for workplace communication.'
        }
    ]

    const handleHumanize = async (style: string, prompt: string) => {
        if (!inputText.trim()) return

        setIsProcessing(prev => ({ ...prev, [style]: true }))

        // Clear previous output for this style
        if (style === 'academic') setAcademicText('')
        if (style === 'casual') setCasualText('')
        if (style === 'professional') setProfessionalText('')

        try {
            const response = await fetch('/api/ai/humanize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: inputText,
                    strength: 'medium',
                    customPrompt: prompt
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to humanize text')
            }

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()

            if (reader) {
                let result = ''
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    
                    const chunk = decoder.decode(value, { stream: true })
                    const lines = chunk.split('\n')
                    
                    for (const line of lines) {
                        if (line.startsWith('0:')) {
                            const content = line.slice(2)
                            if (content) {
                                result += content
                                if (style === 'academic') setAcademicText(result)
                                if (style === 'casual') setCasualText(result)
                                if (style === 'professional') setProfessionalText(result)
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error humanizing text:', error)
            const errorMsg = 'Error: Failed to humanize text. Please try again.'
            if (style === 'academic') setAcademicText(errorMsg)
            if (style === 'casual') setCasualText(errorMsg)
            if (style === 'professional') setProfessionalText(errorMsg)
        } finally {
            setIsProcessing(prev => ({ ...prev, [style]: false }))
        }
    }

    const handleClear = () => {
        setInputText('')
        setAcademicText('')
        setCasualText('')
        setProfessionalText('')
    }

    return (
        <Card className="futuristic-card w-full max-w-md">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 futuristic-heading">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                        <User className="h-5 w-5 text-white" />
                    </div>
                    Humanize Text
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">


                <div className="space-y-3">
                    <label className="text-sm font-medium">Humanization Styles</label>
                    <div className="space-y-3">
                        {humanizeStyles.map((style) => {
                            const Icon = style.icon
                            const outputText = style.key === 'academic' ? academicText :
                                             style.key === 'casual' ? casualText : professionalText
                            const isProcessingStyle = isProcessing[style.key as keyof typeof isProcessing]
                            
                            return (
                                <div key={style.key} className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-md bg-gradient-to-r ${style.color}`}>
                                            <Icon className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium">{style.label}</h3>
                                            <p className="text-xs text-muted-foreground">{style.description}</p>
                                        </div>
                                    </div>
                                    
                                    <Button
                                        onClick={() => handleHumanize(style.key, style.prompt)}
                                        disabled={!inputText.trim() || isProcessingStyle}
                                        variant="outline"
                                        size="sm"
                                        className="futuristic-button w-full"
                                    >
                                        {isProcessingStyle ? (
                                            <>
                                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="h-3 w-3 mr-1" />
                                                Transform to {style.label}
                                            </>
                                        )}
                                    </Button>
                                    
                                    {outputText && (
                                        <div className="p-3 rounded-lg border bg-muted/30">
                                            <p className="text-sm">{outputText}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <Button
                    onClick={handleClear}
                    variant="outline"
                    className="futuristic-button w-full"
                >
                    Clear All
                </Button>
            </CardContent>
        </Card>
    )
}

export default Humanize
