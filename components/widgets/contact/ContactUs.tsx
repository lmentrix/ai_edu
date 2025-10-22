"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
    Mail, 
    MessageSquare, 
    Phone, 
    MapPin, 
    Send, 
    CheckCircle, 
    AlertCircle,
    Clock,
    Users,
    HelpCircle,
    Star,
    Loader2,
    Twitter,
    Github,
    Linkedin,
    ChevronDown,
    Building,
    HeadphonesIcon
} from 'lucide-react'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'normal'
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

    const contactChannels = [
        {
            icon: Mail,
            title: 'Email Support',
            description: 'Send us a detailed message',
            value: 'support@aiedu.com',
            responseTime: 'Within 24 hours',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: HeadphonesIcon,
            title: 'Live Chat',
            description: 'Instant support with our team',
            value: 'Available now',
            responseTime: 'Instant response',
            color: 'from-green-500 to-green-600'
        },
        {
            icon: Phone,
            title: 'Phone Support',
            description: 'Speak with our representatives',
            value: '+1 (555) 123-4567',
            responseTime: 'Mon-Fri, 9AM-6PM EST',
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: Building,
            title: 'Office Visit',
            description: 'Schedule an in-person meeting',
            value: '123 Tech Street, San Francisco',
            responseTime: 'By appointment',
            color: 'from-orange-500 to-orange-600'
        }
    ]

    const faqCategories = [
        {
            category: 'Getting Started',
            questions: [
                {
                    question: 'How do I create my first essay?',
                    answer: 'Simply navigate to the Essay page, enter your topic, select your preferred essay type and length, then click Generate. Our AI will create a custom essay for you in seconds.'
                },
                {
                    question: 'What subscription plans are available?',
                    answer: 'We offer Free, Pro, and Enterprise plans. The Free plan includes basic essay generation, Pro adds advanced features, and Enterprise provides unlimited access with priority support.'
                }
            ]
        },
        {
            category: 'Features & Usage',
            questions: [
                {
                    question: 'Can I edit the generated essays?',
                    answer: 'Yes! All generated essays are fully editable. You can switch between edit and preview modes to make any changes you need, and our AI can help refine your content.'
                },
                {
                    question: 'What essay types are supported?',
                    answer: 'We support argumentative, expository, narrative, descriptive, and compare & contrast essays. Each type is optimized for its specific structure and academic requirements.'
                }
            ]
        },
        {
            category: 'Account & Security',
            questions: [
                {
                    question: 'Is my data secure and private?',
                    answer: 'Absolutely. We use industry-standard AES-256 encryption and never share your essays or personal information with third parties. Your data is completely confidential.'
                },
                {
                    question: 'How do I reset my password?',
                    answer: 'Click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your inbox to reset your password.'
                }
            ]
        }
    ]

    const teamMembers = [
        {
            name: 'Alex Chen',
            role: 'Lead Developer',
            avatar: 'AC',
            color: 'from-blue-500 to-purple-600',
            expertise: 'AI & Machine Learning'
        },
        {
            name: 'Sarah Johnson',
            role: 'AI Specialist',
            avatar: 'SJ',
            color: 'from-purple-500 to-pink-600',
            expertise: 'Natural Language Processing'
        },
        {
            name: 'Mike Williams',
            role: 'Customer Success Lead',
            avatar: 'MW',
            color: 'from-green-500 to-teal-600',
            expertise: 'User Experience'
        },
        {
            name: 'Emily Davis',
            role: 'Product Designer',
            avatar: 'ED',
            color: 'from-orange-500 to-red-600',
            expertise: 'UI/UX Design'
        }
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                priority: 'normal'
            })
            
            // Reset status after 3 seconds
            setTimeout(() => setSubmitStatus('idle'), 3000)
        }, 1500)
    }

    const toggleFaq = (categoryIndex: number, questionIndex: number) => {
        const key = `${categoryIndex}-${questionIndex}`
        setExpandedFaq(expandedFaq === parseInt(key) ? null : parseInt(key))
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero Section */}
            <Card className="futuristic-card overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 p-8 text-center">
                    <CardTitle className="futuristic-heading text-3xl mb-4">Contact Our Support Team</CardTitle>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
                        We're committed to providing exceptional support. Reach out to us through any of the channels below and we'll respond promptly.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Badge variant="outline" className="futuristic-button px-4 py-2">
                            <Clock className="h-4 w-4 mr-2" />
                            24/7 Availability
                        </Badge>
                        <Badge variant="outline" className="futuristic-button px-4 py-2">
                            <Users className="h-4 w-4 mr-2" />
                            Expert Team
                        </Badge>
                        <Badge variant="outline" className="futuristic-button px-4 py-2">
                            <Star className="h-4 w-4 mr-2" />
                            4.9/5 Rating
                        </Badge>
                    </div>
                </div>
            </Card>

            {/* Contact Channels */}
            <Card className="futuristic-card">
                <CardHeader>
                    <CardTitle className="text-xl">How Can We Help You?</CardTitle>
                    <p className="text-muted-foreground">Choose the most convenient way to reach us</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactChannels.map((channel, index) => {
                            const Icon = channel.icon
                            return (
                                <div key={index} className="text-center p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${channel.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{channel.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                                    <p className="text-sm font-medium mb-2">{channel.value}</p>
                                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {channel.responseTime}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <Card className="futuristic-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                                    <Mail className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl">Send Us a Message</h2>
                                    <p className="text-sm text-muted-foreground">Fill out the form below and we'll get back to you</p>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name *</label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email Address *</label>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="your@email.com"
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Subject *</label>
                                    <Input
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="How can we help you?"
                                        required
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Priority Level</label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border bg-background text-sm h-11"
                                    >
                                        <option value="low">Low - General Inquiry</option>
                                        <option value="normal">Normal - Technical Support</option>
                                        <option value="high">High - Account Issue</option>
                                        <option value="urgent">Urgent - Critical Problem</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Message *</label>
                                    <Textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Please provide as much detail as possible so we can assist you better..."
                                        required
                                        rows={6}
                                        className="resize-none"
                                    />
                                </div>

                                {submitStatus === 'success' && (
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                        <span className="text-sm text-green-800">Message sent successfully! We'll respond within 24 hours.</span>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                                        <span className="text-sm text-red-800">Failed to send message. Please try again or contact us directly.</span>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 text-base futuristic-button"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Info & FAQ */}
                <div className="space-y-6">
                    <Card className="futuristic-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5" />
                                Quick Answers
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {faqCategories.map((category, catIndex) => (
                                <div key={catIndex} className="space-y-3">
                                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                        {category.category}
                                    </h3>
                                    {category.questions.map((item, qIndex) => {
                                        const key = `${catIndex}-${qIndex}`
                                        const isExpanded = expandedFaq === parseInt(key)
                                        return (
                                            <div key={qIndex} className="border rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => toggleFaq(catIndex, qIndex)}
                                                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                                                >
                                                    <span className="text-sm font-medium">{item.question}</span>
                                                    <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                                </button>
                                                {isExpanded && (
                                                    <div className="px-4 pb-3 pt-0">
                                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Business Hours */}
                    <Card className="futuristic-card">
                        <CardHeader>
                            <CardTitle className="text-lg">Business Hours</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm">Monday - Friday</span>
                                    <span className="text-sm font-medium">9:00 AM - 6:00 PM EST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Saturday</span>
                                    <span className="text-sm font-medium">10:00 AM - 4:00 PM EST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Sunday</span>
                                    <span className="text-sm font-medium">Closed</span>
                                </div>
                                <div className="pt-3 border-t">
                                    <p className="text-xs text-muted-foreground">
                                        <strong>Emergency Support:</strong> Available 24/7 for critical issues
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Team Section */}
            <Card className="futuristic-card">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Meet Our Expert Team</CardTitle>
                    <p className="text-muted-foreground">Dedicated professionals ready to assist you</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center group">
                                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform`}>
                                    {member.avatar}
                                </div>
                                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                                <p className="text-xs font-medium text-primary">{member.expertise}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="futuristic-card">
                <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                        <h3 className="font-semibold text-lg">Stay Connected</h3>
                        <p className="text-muted-foreground">Follow us for updates, tips, and community support</p>
                        <div className="flex justify-center gap-4">
                            <Button variant="outline" size="lg" className="futuristic-button">
                                <Twitter className="h-5 w-5 mr-2" />
                                Twitter
                            </Button>
                            <Button variant="outline" size="lg" className="futuristic-button">
                                <Github className="h-5 w-5 mr-2" />
                                GitHub
                            </Button>
                            <Button variant="outline" size="lg" className="futuristic-button">
                                <Linkedin className="h-5 w-5 mr-2" />
                                LinkedIn
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ContactUs
