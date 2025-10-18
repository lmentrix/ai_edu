"use client";

import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  BookOpen, 
  Code, 
  Brain,
  Clock,
  ChevronRight
} from "lucide-react";
import { TimelineItem as TimelineItemType, ConvoTimelineProps } from "@/types";
import { 
  Typography, 
  Box, 
  Paper,
  IconButton,
  Chip
} from "@mui/material";
import { 
  AccessTime as AccessTimeIcon,
  Circle as CircleIcon
} from "@mui/icons-material";

const iconMap = {
  note: Lightbulb,
  knowledge: BookOpen,
  code: Code,
  concept: Brain,
};

const colorMap = {
  note: "#eab308",
  knowledge: "#3b82f6",
  code: "#22c55e",
  concept: "#a855f7",
};

const muiColorMap = {
  note: "warning" as const,
  knowledge: "info" as const,
  code: "success" as const,
  concept: "secondary" as const,
};

const importanceColorMap = {
  low: "#d1d5db",
  medium: "#3b82f6",
  high: "#ef4444",
};

export function ConvoTimeline({ 
  items, 
  onItemSelect, 
  className = "", 
  maxHeight = 600 
}: ConvoTimelineProps) {
  const sortedItems = [...items].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 8640000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Conversation Timeline
          <Badge variant="secondary" className="ml-auto">
            {items.length} items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Box
          sx={{
            maxHeight: `${maxHeight}px`,
            overflowY: "auto",
            px: 2,
            py: 2,
          }}
        >
          {sortedItems.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
                color: "text.secondary",
              }}
            >
              <Clock className="h-12 w-12 mb-4 opacity-50" />
              <Typography variant="body1">No timeline items yet</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Important notes and knowledge will appear here
              </Typography>
            </Box>
          ) : (
            <Timeline
              sx={{
                [`& .MuiTimelineItem-root:before`]: {
                  display: "none",
                },
                px: 1,
              }}
            >
              {sortedItems.map((item, index) => {
                const IconComponent = iconMap[item.type];
                const iconColor = colorMap[item.type];
                const muiColor = muiColorMap[item.type];
                const borderColor = importanceColorMap[item.importance];
                
                return (
                  <TimelineItem key={item.id}>
                    <TimelineOppositeContent
                      sx={{ 
                        m: "auto 0",
                        maxWidth: { xs: "80px", sm: "120px" },
                        flex: { xs: "0 1 auto", sm: "0 1 auto" }
                      }}
                      align="right"
                      variant="body2"
                      color="text.secondary"
                    >
                      <Typography variant="caption" component="div">
                        {formatDate(item.timestamp)}
                      </Typography>
                      <Typography variant="caption" component="div">
                        {formatTime(item.timestamp)}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot 
                        color={muiColor}
                        variant="outlined"
                        sx={{
                          borderColor: borderColor,
                          borderWidth: 2,
                          bgcolor: "background.paper",
                          p: 0.5,
                          cursor: onItemSelect ? "pointer" : "default",
                          "&:hover": {
                            transform: onItemSelect ? "scale(1.1)" : "none",
                          },
                          transition: "transform 0.2s ease-in-out",
                        }}
                        onClick={() => onItemSelect && onItemSelect(item)}
                      >
                        <IconComponent 
                          size={16} 
                          color={iconColor}
                        />
                      </TimelineDot>
                      {index < sortedItems.length - 1 && (
                        <TimelineConnector 
                          sx={{
                            bgcolor: borderColor,
                          }}
                        />
                      )}
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          borderTop: `3px solid ${borderColor}`,
                          cursor: "pointer",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            elevation: 3,
                            transform: "translateY(-2px)",
                          },
                        }}
                        onClick={() => onItemSelect && onItemSelect(item)}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 1,
                          }}
                        >
                          <Typography 
                            variant="subtitle2" 
                            component="h3"
                            sx={{ fontWeight: 600 }}
                          >
                            {item.title}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <Chip
                              size="small"
                              label={item.importance}
                              color={
                                item.importance === "high" 
                                  ? "error" 
                                  : item.importance === "medium" 
                                    ? "primary" 
                                    : "default"
                              }
                              variant="outlined"
                            />
                            <Chip
                              size="small"
                              label={item.type}
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {item.description}
                        </Typography>
                        {onItemSelect && (
                          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 h-auto text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                onItemSelect(item);
                              }}
                              sx={{
                                textTransform: "none",
                                fontSize: "0.75rem",
                                p: 0,
                                minHeight: "auto",
                                "&:hover": {
                                  bgcolor: "transparent",
                                  textDecoration: "underline",
                                },
                              }}
                            >
                              View related messages
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </Box>
                        )}
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ConvoTimeline;