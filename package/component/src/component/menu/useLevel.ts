import {
  computed,
  inject,
  provide,
  reactive,
  Ref,
  isRef,
  ComputedRef,
  UnwrapNestedRefs,
} from "vue";

export const LevelInjectionKey = Symbol("menuLevelKey");

export function provideLevel(level: Ref<number> | number) {
  const computedLevel = computed(() => (isRef(level) ? level.value : level));
  provide(
    LevelInjectionKey,
    reactive({
      level: computedLevel,
    })
  );
}

export default function useLevel(props?: { provideNextLevel?: boolean }) {
  const { provideNextLevel } = props || {};
  const levelContext = inject(LevelInjectionKey) as UnwrapNestedRefs<{
    level: ComputedRef<number>;
  }>;
  const level = computed(() => levelContext.level || 1);

  if (provideNextLevel) {
    const nextLevel = computed(() => level.value + 1);
    provideLevel(nextLevel);
  }

  return {
    level,
  };
}
