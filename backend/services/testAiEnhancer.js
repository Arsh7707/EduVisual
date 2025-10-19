/**
 * Test script for AI Content Enhancer
 * 
 * This script tests the AI enhancement service independently
 * Run with: node services/testAiEnhancer.js
 */

import { enhanceContent, checkConfiguration } from './aiEnhancer.js';

// Sample lecture content for testing
const sampleContent = `
Photosynthesis: The Process of Energy Conversion in Plants

Photosynthesis is the fundamental process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose molecules. This process is essential for life on Earth as it produces oxygen and serves as the primary source of energy for most living organisms.

The Process:
Photosynthesis occurs primarily in the chloroplasts of plant cells, specifically in structures called thylakoids. The process can be divided into two main stages: the light-dependent reactions and the light-independent reactions (Calvin cycle).

Light-Dependent Reactions:
These reactions occur in the thylakoid membranes and require direct light energy. Chlorophyll and other pigments absorb light energy, which is used to split water molecules (H2O) into hydrogen and oxygen. The oxygen is released as a byproduct, while the hydrogen is used in the next stage. This process also produces ATP and NADPH, which are energy-carrying molecules.

Calvin Cycle (Light-Independent Reactions):
The Calvin cycle takes place in the stroma of the chloroplast and does not require direct light. It uses the ATP and NADPH produced in the light-dependent reactions, along with carbon dioxide (CO2) from the atmosphere, to synthesize glucose (C6H12O6). This process is also called carbon fixation.

Importance:
Photosynthesis is crucial because it:
1. Produces oxygen that most organisms need for respiration
2. Removes carbon dioxide from the atmosphere
3. Forms the base of most food chains
4. Stores solar energy in a usable chemical form

Factors Affecting Photosynthesis:
Several factors can affect the rate of photosynthesis, including light intensity, carbon dioxide concentration, temperature, and water availability. Understanding these factors is important for agriculture and environmental science.
`;

async function runTest() {
  console.log('='.repeat(60));
  console.log('AI Content Enhancer - Test Script');
  console.log('='.repeat(60));
  console.log();

  // Step 1: Check configuration
  console.log('Step 1: Checking AI configuration...');
  const config = checkConfiguration();
  console.log(`Provider: ${config.provider}`);
  console.log(`Configured: ${config.configured}`);
  console.log(`Message: ${config.message}`);
  console.log();

  if (!config.configured) {
    console.error('❌ AI service is not configured properly!');
    console.error('Please check your .env file and ensure API keys are set.');
    console.error('See .env.example for reference.');
    process.exit(1);
  }

  console.log('✅ AI service is configured correctly!');
  console.log();

  // Step 2: Test content enhancement
  console.log('Step 2: Testing content enhancement...');
  console.log(`Content length: ${sampleContent.length} characters`);
  console.log();

  try {
    console.log('Sending request to AI service...');
    const startTime = Date.now();
    
    const result = await enhanceContent(sampleContent, {
      topic: 'Biology - Photosynthesis'
    });
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`✅ Enhancement completed in ${duration} seconds`);
    console.log();

    if (result.success) {
      console.log('='.repeat(60));
      console.log('ENHANCEMENT RESULTS');
      console.log('='.repeat(60));
      console.log();
      
      console.log('📊 METADATA:');
      console.log(`  Provider: ${result.provider}`);
      console.log(`  Original Length: ${result.metadata.originalLength} characters`);
      console.log(`  Processed At: ${result.metadata.processedAt}`);
      console.log(`  Topic: ${result.metadata.topic}`);
      console.log();
      
      console.log('📝 OVERALL SUMMARY:');
      console.log(`  ${result.data.summary}`);
      console.log();
      
      console.log(`📚 SECTIONS: ${result.data.sections.length} sections found`);
      result.data.sections.forEach((section, index) => {
        console.log();
        console.log(`  Section ${index + 1}: ${section.title}`);
        console.log(`  Summary: ${section.summary}`);
        console.log(`  Clarifications: ${section.clarifications?.length || 0}`);
        console.log(`  Visual Suggestions: ${section.visualSuggestions?.length || 0}`);
        console.log(`  Activity Suggestions: ${section.activitySuggestions?.length || 0}`);
      });
      console.log();
      
      console.log('💡 KEY TAKEAWAYS:');
      result.data.overallSuggestions?.keyTakeaways?.forEach((takeaway, index) => {
        console.log(`  ${index + 1}. ${takeaway}`);
      });
      console.log();
      
      console.log('🎨 RECOMMENDED VISUALS:');
      result.data.overallSuggestions?.recommendedVisuals?.forEach((visual, index) => {
        console.log(`  ${index + 1}. ${visual}`);
      });
      console.log();
      
      console.log('🎯 RECOMMENDED ACTIVITIES:');
      result.data.overallSuggestions?.recommendedActivities?.forEach((activity, index) => {
        console.log(`  ${index + 1}. ${activity}`);
      });
      console.log();
      
      console.log('='.repeat(60));
      console.log('DETAILED SECTION BREAKDOWN');
      console.log('='.repeat(60));
      console.log();
      
      result.data.sections.forEach((section, index) => {
        console.log(`\n--- Section ${index + 1}: ${section.title} ---\n`);
        
        if (section.clarifications && section.clarifications.length > 0) {
          console.log('Clarifications:');
          section.clarifications.forEach(clarification => {
            console.log(`  • ${clarification.term}: ${clarification.explanation}`);
          });
          console.log();
        }
        
        if (section.visualSuggestions && section.visualSuggestions.length > 0) {
          console.log('Visual Suggestions:');
          section.visualSuggestions.forEach(visual => {
            console.log(`  • Type: ${visual.type}`);
            console.log(`    Description: ${visual.description}`);
            console.log(`    Placement: ${visual.placement}`);
            console.log(`    Reason: ${visual.reason}`);
            console.log();
          });
        }
        
        if (section.activitySuggestions && section.activitySuggestions.length > 0) {
          console.log('Activity Suggestions:');
          section.activitySuggestions.forEach(activity => {
            console.log(`  • Type: ${activity.type}`);
            console.log(`    Description: ${activity.description}`);
            console.log(`    Placement: ${activity.placement}`);
            console.log(`    Reason: ${activity.reason}`);
            console.log();
          });
        }
      });
      
      console.log('='.repeat(60));
      console.log('✅ TEST COMPLETED SUCCESSFULLY!');
      console.log('='.repeat(60));
      console.log();
      console.log('The AI Content Enhancer is working correctly.');
      console.log('You can now integrate it into your routes.');
      
    } else {
      console.error('❌ Enhancement failed!');
      console.error(`Error: ${result.error}`);
      console.error('Full result:', JSON.stringify(result, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:');
    console.error(error);
    process.exit(1);
  }
}

// Run the test
runTest();

