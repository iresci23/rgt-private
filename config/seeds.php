<?php

/**
 * Seeder config for default system data
 */
return [
    'app_design' => [
        [
            'name' => 'Overview',
            'layout' => 'text-editor',
            'content' => "<b>We’ll go through specific questions in a bit, but can you describe the personality that you want {your organization} to convey?</b><br/>
                            <p>Here’s an example answer from a previous client: PIP - optimistic , brings system change to a bureaucracy fighting against her, optimistic for change, dreaming and wondering what is possible, advocate of strength and confidence.  Technologically advanced.  Excited to use every capability possibility.  PIP is technologically in the future.</p><br/>
                            <b>How do you want people to feel when they come to the website?</b>
                            <p>Here’s an example answer from a previous client: Inspired. It’s typically someone new the disability world.  They are bewildered, looking for answers.  Looking for calm in chaos. The sense of not being alone.  The program is about team building and strength in numbers. Convey that the history of the program has worked.  An opening experience about an open dialogue.  All disability advocacy has common issues and needs so we don't focus on one specific disability.</p>
            ",
            'trigger_widget' => null,
            'sort_order' => 1
        ],
        [
            'name' => 'User Groups',
            'layout' => 'text-editor',
            'content' => "<b>User groups / Demographics - Who will visit this website?</b>

                <p>Per user group, what do we know about their demographics, personality or education level?</p>

                <p>Note: Functional user groups should have already been surfaced in the first requirements phone call, but listen here to see if anything was missed.  However, the main point here is to understand demographics/personality type/education level per group.</p>

                <p>(If redesigning an existing site) Should we be designing for your current clientele or do you have plans to broaden or shift your target audience?</p>

                <p>Here’s an example answer from a previous client: PIP is now about diversity while it was formerly upper class white women.</p>
            ",
            'trigger_widget' => null,
            'sort_order' => 2
        ],
        [
            'name' => 'Desired Personality',
            'layout' => 'text-editor',
            'content' => "
                    <p>Rate all of these on a scale of 1-10 with 1 being extremely tied to the attribute on the left and 10 being extremely tied to the attribute on the right.</p>
            ",
            'trigger_widget' => 'personality-table-widget',
            'sort_order' => 3
        ]
    ],
    'personality_table' => [
        [
            'name' => 'Feminine - Masculine',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Young - Mature',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Economical - Luxury',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Classic - Trendy',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Serious - Playful',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Quiet - Loud',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Simple - Complex',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Subtle - Obvious',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Corporate and professional - Personable and friendly',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Careful thinking and planning - Spontaneous and high energy',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Established - Cutting edge',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Accessible to all - Exclusive',
            'score' => 0,
            'notes' => ''
        ],
        [
            'name' => 'Expected - Quirky',
            'score' => 0,
            'notes' => ''
        ],
    ],
    'proposal' => [
        [
            'name' => 'Title Page',
            'layout' => 'text-editor',
            'content' => "",
            'trigger_widget' => null,
            'sort_order' => 1
        ],
        [
            'name' => 'Introduction',
            'layout' => 'text-editor',
            'content' => "",
            'trigger_widget' => null,
            'sort_order' => 1
        ],
        [
            'name' => 'Architecture',
            'layout' => 'text-editor',
            'content' => "",
            'trigger_widget' => null,
            'sort_order' => 1
        ],
        [
            'name' => 'Estimates',
            'layout' => 'widget-only',
            'content' => "",
            'trigger_widget' => 'estimates-widget',
            'sort_order' => 1
        ],
        [
            'name' => 'Timeline & Costs',
            'layout' => 'text-editor',
            'content' => "",
            'trigger_widget' => 'time-cost-widget',
            'sort_order' => 1
        ],
        [
            'name' => 'Assumptions',
            'layout' => 'text-editor',
            'content' => "",
            'trigger_widget' => null,
            'sort_order' => 1
        ],
        [
            'name' => 'Others',
            'layout' => 'text-editor',
            'content' => "",
            'trigger_widget' => null,
            'sort_order' => 1
        ],
        [
            'name' => 'Signatures',
            'layout' => 'text-editor',
            'content' => "
            <h4><b>Next Steps</b></h4>
            <ol>
            <li>Please read the contract on the previous page to make sure you understand all the details involved with us working together. It’s really important to us that everything is transparent and understood from the beginning so that we lay a solid foundation for a great working relationship.</li>
            <li>If you have any questions at all, please let us know. We’re happy to clarify any points and there may be some items that we can sort out together. We’re committed to finding the best way to work together.</li>
            <li>Once you feel confident about everything and are ready to move forward, please click the 'sign here' button below. Sign in the box that pops up to make the acceptance official.</li>
            <li>Once we receive notification of your acceptance, we’ll contact you shortly to sort out next steps and get the project rolling. We’ll email you a separate copy of the signed contract for your records.</li>
            <li>If you’d like to speak to us by phone, don’t hesitate to call.</li>
            </ol>
            ",
            'trigger_widget' => 'signature-widget',
            'sort_order' => 1
        ],
    ],
];