"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { 
    User, 
    Sparkles, 
    Loader2, 
    Copy, 
    Check,
    RefreshCw,
    Settings,
    Eye,
    EyeOff,
    History,
    Trash2
} from 'lucide-react'
import { useHumanizeStore, HumanizeStrength, HumanizeStyle, PreservePriority, strengthDescriptions, styleDescriptions, preserveDescriptions } from '@/stores/Humanize'

const HumanizeCard = () => {
    const {
        inputText,
        results,
        config,
        isProcessing,
        history,
        showComparison,
        showAdvancedOptions,
        setInputText,
        humanizeText,
        setStrength,
        setStyle,
        setPreserve,
        toggleComparison,
        toggleAdvancedOptions,
        clearResults,
        clearHistory,
        useResult
    } = useHumanizeStore()

    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
    const [activeTab, setActiveTab] = useState('input')
    const [showHistory, setShowHistory] = useState(false)

    // Handle copying text to clipboard
    const handleCopy = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedIndex(index)
            setTimeout(() => setCopiedIndex(null), 2000)
        } catch (error) {
            console.error('Failed to copy text:', error)
        }
    }

    // Handle humanization
    const handleHumanize = async () => {
        if (!inputText.trim()) return
        try {
            await humanizeText()
            setActiveTab('result')
        } catch (error) {
            console.error('Error humanizing text:', error)
        }
    }

    // Get the latest result
    const latestResult = results.length > 0 ? results[results.length - 1] : null

    return (
        <Card className="futuristic-card w-full max-w-4xl mx-auto">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 futuristic-heading">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                            <User className="h-5 w-5 text-white" />
                        </div>
                        AI Text Humanizer
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        {history.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowHistory(!showHistory)}
                                className="futuristic-button"
                            >
                                {showHistory ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                History ({history.length})
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleAdvancedOptions}
                            className="futuristic-button"
                        >
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Configuration Options */}
                {showAdvancedOptions && (
                    <div className="p-4 rounded-lg border bg-muted/30 space-y-4">
                        <h3 className="text-sm font-medium">Humanization Settings</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Strength Selection */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Strength</label>
                                <Select value={config.strength} onValueChange={(value: HumanizeStrength) => setStrength(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="strong">Strong</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    {strengthDescriptions[config.strength]}
                                </p>
                            </div>

                            {/* Style Selection */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Style</label>
                                <Select value={config.style} onValueChange={(value: HumanizeStyle) => setStyle(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="neutral">Neutral</SelectItem>
                                        <SelectItem value="academic">Academic</SelectItem>
                                        <SelectItem value="professional">Professional</SelectItem>
                                        <SelectItem value="creative">Creative</SelectItem>
                                        <SelectItem value="casual">Casual</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    {styleDescriptions[config.style]}
                                </p>
                            </div>

                            {/* Preserve Selection */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium">Preserve</label>
                                <Select value={config.preserve} onValueChange={(value: PreservePriority) => setPreserve(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="meaning">Meaning</SelectItem>
                                        <SelectItem value="tone">Tone</SelectItem>
                                        <SelectItem value="structure">Structure</SelectItem>
                                        <SelectItem value="length">Length</SelectItem>
                                        <SelectItem value="key_terms">Key Terms</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    {preserveDescriptions[config.preserve]}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="input">Input</TabsTrigger>
                        <TabsTrigger value="result" disabled={!latestResult}>Result</TabsTrigger>
                        <TabsTrigger value="comparison" disabled={!latestResult || !showComparison}>Compare</TabsTrigger>
                    </TabsList>

                    {/* Input Tab */}
                    <TabsContent value="input" className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Text to Humanize</label>
                            <Textarea
                                placeholder="Enter your text here to make it sound more natural and human-like..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="min-h-[200px] resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                    {inputText.split(/\s+/).filter(word => word.length > 0).length} words
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    Strength: {config.strength}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    Style: {config.style}
                                </Badge>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setInputText('')}
                                    disabled={!inputText.trim()}
                                    className="futuristic-button"
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Clear
                                </Button>
                                <Button
                                    onClick={handleHumanize}
                                    disabled={!inputText.trim() || isProcessing}
                                    className="futuristic-button"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-4 w-4 mr-1" />
                                            Humanize
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Result Tab */}
                    <TabsContent value="result" className="space-y-4">
                        {latestResult && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-xs">
                                            {latestResult.humanizedText.split(/\s+/).filter(word => word.length > 0).length} words
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            Strength: {latestResult.strength}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            Style: {latestResult.style}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleCopy(latestResult.humanizedText, -1)}
                                            className="futuristic-button"
                                        >
                                            {copiedIndex === -1 ? (
                                                <Check className="h-4 w-4" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setInputText(latestResult.humanizedText)}
                                            className="futuristic-button"
                                        >
                                            <RefreshCw className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg border bg-muted/30">
                                    <p className="whitespace-pre-wrap">{latestResult.humanizedText}</p>
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    {/* Comparison Tab */}
                    <TabsContent value="comparison" className="space-y-4">
                        {latestResult && showComparison && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium">Original Text</label>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleCopy(latestResult.originalText, 0)}
                                            className="futuristic-button"
                                        >
                                            {copiedIndex === 0 ? (
                                                <Check className="h-4 w-4" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    <div className="p-4 rounded-lg border bg-muted/30 max-h-[400px] overflow-y-auto">
                                        <p className="whitespace-pre-wrap">{latestResult.originalText}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium">Humanized Text</label>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleCopy(latestResult.humanizedText, 1)}
                                            className="futuristic-button"
                                        >
                                            {copiedIndex === 1 ? (
                                                <Check className="h-4 w-4" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    <div className="p-4 rounded-lg border bg-muted/30 max-h-[400px] overflow-y-auto">
                                        <p className="whitespace-pre-wrap">{latestResult.humanizedText}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                {/* History Section */}
                {showHistory && history.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Recent History</h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearHistory}
                                className="futuristic-button"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {history.slice(0, 10).map((item, index) => (
                                <div key={index} className="p-3 rounded-lg border bg-muted/30 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-xs">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                                {item.strength} - {item.style}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => useResult(index)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <RefreshCw className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleCopy(item.humanizedText, index + 100)}
                                                className="h-8 w-8 p-0"
                                            >
                                                {copiedIndex === index + 100 ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-sm line-clamp-2">{item.humanizedText}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Comparison Toggle */}
                <div className="flex items-center justify-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleComparison}
                        className="futuristic-button"
                    >
                        {showComparison ? (
                            <>
                                <EyeOff className="h-4 w-4 mr-1" />
                                Hide Comparison
                            </>
                        ) : (
                            <>
                                <Eye className="h-4 w-4 mr-1" />
                                Show Comparison
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default HumanizeCard
