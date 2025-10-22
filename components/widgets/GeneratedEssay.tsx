"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
    FileText,
    Sparkles,
    Copy,
    Download,
    RefreshCw,
    Loader2,
    Eye,
    EyeOff,
    Edit3,
    CheckCircle,
    AlertCircle,
    BookOpen,
    History,
    Zap,
    Settings,
    ChevronDown,
    ChevronUp,
    Bookmark,
    Share2,
    FileText as FileIcon
} from 'lucide-react'

interface GeneratedEssayProps {
    className?: string
    initialEssay?: string
    onEssayChange?: (essay: string) => void
    readOnly?: boolean
}

const GeneratedEssay: React.FC<GeneratedEssayProps> = ({
    className = "",
    initialEssay = "",
    onEssayChange,
    readOnly = false
}) => {
    const [essay, setEssay] = useState(initialEssay)
    const [wordCount, setWordCount] = useState(0)
    const [isGenerating, setIsGenerating] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [isEditing, setIsEditing] = useState(!readOnly)
    const [topic, setTopic] = useState("")
    const [essayType, setEssayType] = useState("expository")
    const [essayLength, setEssayLength] = useState("medium")
    const [generationStatus, setGenerationStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('idle')
    const [savedEssays, setSavedEssays] = useState<Array<{id: string, title: string, content: string, date: string}>>([])
    const [showHistory, setShowHistory] = useState(false)
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [creativityLevel, setCreativityLevel] = useState(0.7)
    const [formalityLevel, setFormalityLevel] = useState(0.8)
    const [isBookmarked, setIsBookmarked] = useState(false)

    useEffect(() => {
        const words = essay.trim() ? essay.trim().split(/\s+/).filter(word => word.length > 0).length : 0
        setWordCount(words)
        onEssayChange?.(essay)
    }, [essay, onEssayChange])

    const handleGenerateEssay = async () => {
        if (!topic.trim()) return

        setIsGenerating(true)
        setGenerationStatus('generating')
        setEssay("") // Clear previous essay

        try {
            const response = await fetch('/api/ai/essay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'generate',
                    prompt: topic,
                    essayType,
                    length: essayLength
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate essay')
            }

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let generatedText = ""

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    
                    const chunk = decoder.decode(value)
                    const lines = chunk.split('\n')
                    
                    for (const line of lines) {
                        if (line.startsWith('0:')) {
                            const content = line.slice(2)
                            try {
                                const parsed = JSON.parse(content)
                                if (parsed.text) {
                                    generatedText += parsed.text
                                    setEssay(generatedText)
                                }
                            } catch (e) {
                                // Skip parsing errors
                            }
                        }
                    }
                }
            }
            
            setGenerationStatus('completed')
        } catch (error) {
            console.error('Error generating essay:', error)
            setGenerationStatus('error')
            setEssay("Error: Failed to generate essay. Please try again.")
        } finally {
            setIsGenerating(false)
        }
    }

    const handleCopyEssay = () => {
        navigator.clipboard.writeText(essay)
    }

    const handleDownloadEssay = () => {
        const blob = new Blob([essay], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'generated-essay.txt'
        a.click()
        URL.revokeObjectURL(url)
    }

    const handleRegenerateEssay = () => {
        if (topic.trim()) {
            handleGenerateEssay()
        }
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const handleSaveEssay = () => {
        if (!essay.trim() || !topic.trim()) return
        
        const newEssay = {
            id: Date.now().toString(),
            title: topic.slice(0, 50) + (topic.length > 50 ? '...' : ''),
            content: essay,
            date: new Date().toLocaleDateString()
        }
        
        setSavedEssays(prev => [newEssay, ...prev.slice(0, 4)]) // Keep only 5 most recent
    }

    const handleLoadEssay = (savedEssay: typeof savedEssays[0]) => {
        setEssay(savedEssay.content)
        setTopic(savedEssay.title)
        setGenerationStatus('completed')
    }

    const handleShareEssay = () => {
        if (!essay.trim()) return
        
        // In a real app, this would open a share dialog or generate a shareable link
        console.log('Share essay:', essay)
    }

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked)
    }

    return (
        <Card className={`futuristic-card w-full ${className}`}>
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        <span className="futuristic-heading">Generated Essay</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {essay && (
                            <>
                                <Badge variant="outline" className="futuristic-button">
                                    {wordCount} words
                                </Badge>
                                <Badge variant="outline" className="futuristic-button">
                                    {essayType}
                                </Badge>
                            </>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleVisibility}
                            className="h-8 w-8"
                        >
                            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            
            {isVisible && (
                <CardContent className="space-y-4">
                    {/* Essay Generation Controls */}
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <Textarea
                                placeholder="Enter your essay topic..."
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="flex-1 min-h-[60px]"
                                disabled={isGenerating}
                            />
                            <Button
                                onClick={handleGenerateEssay}
                                disabled={isGenerating || !topic.trim()}
                                className="futuristic-button"
                            >
                                {isGenerating ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Sparkles className="h-4 w-4" />
                                )}
                                Generate
                            </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            <select
                                value={essayType}
                                onChange={(e) => setEssayType(e.target.value)}
                                className="px-3 py-1 rounded-md border border-input bg-background text-sm"
                                disabled={isGenerating}
                            >
                                <option value="argumentative">Argumentative</option>
                                <option value="expository">Expository</option>
                                <option value="narrative">Narrative</option>
                                <option value="descriptive">Descriptive</option>
                                <option value="compare">Compare & Contrast</option>
                            </select>
                            
                            <select
                                value={essayLength}
                                onChange={(e) => setEssayLength(e.target.value)}
                                className="px-3 py-1 rounded-md border border-input bg-background text-sm"
                                disabled={isGenerating}
                            >
                                <option value="short">Short (300-500 words)</option>
                                <option value="medium">Medium (600-900 words)</option>
                                <option value="long">Long (1000-1500 words)</option>
                            </select>
                            
                            {essay && generationStatus === 'completed' && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRegenerateEssay}
                                    disabled={isGenerating}
                                    className="futuristic-button"
                                >
                                    <RefreshCw className="h-4 w-4 mr-1" />
                                    Regenerate
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Generation Status */}
                    {generationStatus !== 'idle' && (
                        <div className="flex items-center gap-2 p-2 rounded-md bg-muted/30">
                            {generationStatus === 'generating' && (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                                    <span className="text-sm">Generating essay...</span>
                                </>
                            )}
                            {generationStatus === 'completed' && (
                                <>
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Essay generated successfully</span>
                                </>
                            )}
                            {generationStatus === 'error' && (
                                <>
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                    <span className="text-sm">Failed to generate essay</span>
                                </>
                            )}
                        </div>
                    )}

                    {/* Essay Display */}
                    {essay && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">Essay Content</h3>
                                {!readOnly && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={toggleEdit}
                                        className="h-8 px-2"
                                    >
                                        {isEditing ? (
                                            <>
                                                <Eye className="h-4 w-4 mr-1" />
                                                Preview
                                            </>
                                        ) : (
                                            <>
                                                <Edit3 className="h-4 w-4 mr-1" />
                                                Edit
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                            
                            {isEditing ? (
                                <Textarea
                                    value={essay}
                                    onChange={(e) => setEssay(e.target.value)}
                                    className="min-h-[300px] resize-none"
                                    placeholder="Your essay will appear here..."
                                />
                            ) : (
                                <div className="p-4 rounded-lg border bg-muted/30 min-h-[300px] whitespace-pre-wrap">
                                    <p className="text-sm leading-relaxed">{essay}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    {essay && (
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCopyEssay}
                                className="futuristic-button"
                            >
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDownloadEssay}
                                className="futuristic-button"
                            >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                            </Button>
                        </div>
                    )}

                    {/* Additional Features Section */}
                    <div className="space-y-4">
                        {/* Advanced Settings */}
                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="w-full justify-between futuristic-button"
                            >
                                <span className="flex items-center gap-2">
                                    <Settings className="h-4 w-4" />
                                    Advanced Settings
                                </span>
                                {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                            
                            {showAdvanced && (
                                <div className="p-3 space-y-3 rounded-lg border bg-muted/30">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium">Creativity Level</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="1"
                                                step="0.1"
                                                value={creativityLevel}
                                                onChange={(e) => setCreativityLevel(parseFloat(e.target.value))}
                                                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                                                disabled={isGenerating}
                                            />
                                            <span className="text-xs w-8 text-right">{creativityLevel}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium">Formality Level</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="1"
                                                step="0.1"
                                                value={formalityLevel}
                                                onChange={(e) => setFormalityLevel(parseFloat(e.target.value))}
                                                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                                                disabled={isGenerating}
                                            />
                                            <span className="text-xs w-8 text-right">{formalityLevel}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Essay Actions */}
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSaveEssay}
                                disabled={!essay.trim()}
                                className="futuristic-button"
                            >
                                <Bookmark className="h-4 w-4 mr-1" />
                                Save
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleShareEssay}
                                disabled={!essay.trim()}
                                className="futuristic-button"
                            >
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleBookmark}
                                disabled={!essay.trim()}
                                className={`futuristic-button ${isBookmarked ? 'bg-blue-50 border-blue-300' : ''}`}
                            >
                                <Bookmark className={`h-4 w-4 mr-1 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
                                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                            </Button>
                        </div>

                        {/* Essay History */}
                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowHistory(!showHistory)}
                                className="w-full justify-between futuristic-button"
                            >
                                <span className="flex items-center gap-2">
                                    <History className="h-4 w-4" />
                                    Recent Essays ({savedEssays.length})
                                </span>
                                {showHistory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                            
                            {showHistory && (
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {savedEssays.length === 0 ? (
                                        <p className="text-xs text-muted-foreground p-2 text-center">No saved essays yet</p>
                                    ) : (
                                        savedEssays.map((savedEssay) => (
                                            <div
                                                key={savedEssay.id}
                                                onClick={() => handleLoadEssay(savedEssay)}
                                                className="p-2 rounded-lg border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-xs font-medium truncate">{savedEssay.title}</h4>
                                                        <p className="text-xs text-muted-foreground">{savedEssay.date}</p>
                                                    </div>
                                                    <FileIcon className="h-3 w-3 text-muted-foreground ml-2 mt-1 flex-shrink-0" />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="futuristic-button h-auto p-3 flex-col"
                            >
                                <Zap className="h-4 w-4 mb-1" />
                                <span className="text-xs">Quick Generate</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="futuristic-button h-auto p-3 flex-col"
                            >
                                <FileText className="h-4 w-4 mb-1" />
                                <span className="text-xs">Templates</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    )
}

export default GeneratedEssay
