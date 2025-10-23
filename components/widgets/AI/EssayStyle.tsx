"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, PenTool } from 'lucide-react'
import { useEssayModeStore } from '@/stores/essayMode'

const EssayStyle = () => {
    const {
        selectedStyle,
        availableStyles,
        setSelectedStyle,
        applyStyle
    } = useEssayModeStore()

    const handleStyleSelect = (value: string) => {
        setSelectedStyle(value)
    }

    const handleApplyStyle = () => {
        applyStyle()
    }

    return (
        <Card className="futuristic-card w-full max-w-md">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 futuristic-heading">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                        <PenTool className="h-5 w-5 text-white" />
                    </div>
                    Essay Style
                    {selectedStyle && (
                        <Badge variant="outline" className="ml-auto futuristic-button">
                            {availableStyles.find(s => s.value === selectedStyle)?.label}
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-y-2">
                    {availableStyles.map((style) => (
                        <div
                            key={style.value}
                            onClick={() => handleStyleSelect(style.value)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                                selectedStyle === style.value
                                    ? 'border-blue-400 bg-blue-50/50 shadow-sm'
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50/50'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-sm">{style.label}</h3>
                                        {selectedStyle === style.value && (
                                            <Check className="h-4 w-4 text-blue-600" />
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">{style.description}</p>
                                </div>
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${style.color} ml-2 mt-1`}></div>
                            </div>
                        </div>
                    ))}
                </div>
                <Button
                    onClick={handleApplyStyle}
                    disabled={!selectedStyle}
                    className="w-full futuristic-button mt-4 "
                >
                    Apply Style
                </Button>
            </CardContent>
        </Card>
    )
}

export default EssayStyle
