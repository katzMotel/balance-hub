'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { TextArea } from '@/components/ui/TextArea';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
export default function ComponentsTest() {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Button Variants</h2>
        <div className="flex gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Button Sizes</h2>
        <div className="flex gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">States</h2>
        <div className="flex gap-4">
          <Button onClick={() => alert('Clicked!')}>Clickable</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
       <h2 className="text-xl font-bold mb-4">Cards</h2>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Basic Card</CardTitle>
          </CardHeader>
          <CardContent>This is a card with some content.</CardContent>
        </Card>

        <Card hover>
          <CardHeader>
            <CardTitle>Hover Card</CardTitle>
          </CardHeader>
          <CardContent>Hover over me to see the effect!</CardContent>
        </Card>
      </div>
  <h2 className="text-xl font-bold mb-4">Input</h2>
  <div className="w-1/3 space-y-4">
    <Input label="Username" placeholder="Enter your username" />
    <Input label="Email" type="email" placeholder="Enter your email" />
    <Input label="Password" type="password" placeholder="Enter your password" />
    <Input label="With Error" placeholder="This has an error" error="Invalid input" />
  </div>

 <h2 className="text-xl font-bold mb-4">Select</h2>
  <div className="w-1/3 space-y-4">
    <Select label="Select an option">
      <option value="">Choose...</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
    <Select label="With Error" error="Invalid selection">
      <option value="">Choose...</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  </div>

  <h2 className="text-xl font-bold mb-4">Badges</h2>
  <div className="flex gap-4 items-center">
    <Badge variant="success" size="sm">Success Small</Badge>
    <Badge variant="warning" size="md">Warning Medium</Badge>
    <Badge variant="danger" size="lg">Danger Large</Badge>
    <Badge variant="neutral" size="md">Neutral Medium</Badge>
  </div>

  <h2 className="text-xl font-bold mb-4">TextArea</h2>
  <div className="w-1/3 space-y-4">
    <TextArea label="Comments" placeholder="Enter your comments here..." rows={4} />
    <TextArea label="With Error" placeholder="This has an error" error="Invalid input" rows={4} />
    </div>
 <h2 className="text-xl font-bold mb-4">ToggleSwitch</h2>
      <div className="space-y-4">
        <ToggleSwitch 
          label="Enable Notifications" 
          checked={notifications}
          onChange={setNotifications}
        />
        <ToggleSwitch 
          label="Dark Mode" 
          checked={darkMode}
          onChange={setDarkMode}
        />
        <ToggleSwitch 
          label="Disabled Switch" 
          disabled 
          checked={false}
          onChange={() => {}}
        />
      </div>

</div>

  );


}