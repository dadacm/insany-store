import Select from '@/components/select/Select';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex justify-between">
          <Select
            placeholder="Selecione a categoria"
            options={[{ label: '12312', value: '12' }]}
          />
          <Select
            placeholder="Organizar por"
            options={[{ label: '12312', value: '12' }]}
          />
        </div>
      </main>
    </div>
  );
}
